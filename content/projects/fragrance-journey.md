---
title: Fragrance Journey Website
description: An AI powered application that tracks what fragrances (perfumes, colognes) you own, like, and dislike and generates regular recommendations for new things you might enjoy.
tech: Python, Django, Nuxt, Celery, Stripe, AI
status: In Progress
version: 0.0.1
banner: /link/to/hero.image
links:
  github:
    url: https://github.com/supermanzer/fragrance.supermanzer.io
    icon: mdi-github
    text: View on Github
published_to_twitter: false
lead:
  name: Ryan Manzer
  bio: He puts the Manzer in Supermanzer
  image: /img/supermanzer.jpeg
---
## Motivation

I like fragrances, and like most hobbies this one comes with a spreadsheet. Mine tracks what I own, what I like but don't own, and what I've tried and didn't care for. For a while I would paste that spreadsheet into Claude or Gemini and ask for new things to try. It worked pretty well, but it was manual, I had to remember to do it, and the "system" was really just me and a chat window.

I wanted to flip that around. If the app that tracks my collection already knows my taste, it should be the one going out and finding new fragrances and telling me about them. It also gave me a good excuse to build something I'd been curious about: an application that works with an LLM programmatically instead of through a chatbot.

## Approach

The core idea is simple. Once a month the app looks at my collection, searches the web for new releases that might fit, and emails me a short list of picks with an explanation of why each one made the cut. Everything else in the project exists to make that happen reliably.

I stuck with a pattern I've now used a few times: a Django back-end with a REST API and a Nuxt front-end. The pieces that were new to me are what make it an AI application.

### The recommendation pipeline

A single Celery task runs the whole thing, in six steps:

1. **Build a preference profile** - An LLM reads my collection and writes up a taste analysis (notes I love, notes I dislike, angles worth searching).
2. **Run discovery searches** - The profile drives a couple of searches against a self-hosted SearXNG instance.
3. **Select candidates** - An LLM picks five fragrances from the search results.
4. **Verify candidates** - Each pick gets its own search and a verification pass to make sure it actually exists and matches what was claimed.
5. **Write the email content** - An LLM writes a rationale for each pick and a personalized intro.
6. **Render and send** - A Django template turns it into an HTML email.

Breaking it into small, structured LLM calls rather than one giant prompt was probably the most useful thing I learned here. My first version used a small self-hosted `qwen` model and it was very sensitive to prompt length and ambiguity. Short, specific tasks with structured output were much easier to get right, and they're easier to debug when something goes sideways. The verification step exists because of hallucinations. A confident recommendation for a fragrance that doesn't exist is not a great look for a recommendation engine.

I also stored every pick as a `Recommendation` record so future runs never suggest the same thing twice.

### Infrastructure

The first version ran on a bramble of Raspberry Pis with `microk8s`. That taught me a lot about Kubernetes but not much about keeping a site up while I also work from home on the same network. The current version is a Docker Compose stack (Django, Celery + beat, Redis, PostgreSQL, SearXNG, Nuxt, nginx) on a single DigitalOcean droplet. SearXNG has no external port so only the back-end can reach it, and Celery Beat stores its schedules in the database so I can change them without a redeploy.

## What I've learned so far

* Small, structured LLM calls beat one big prompt, and verifying model output with a second source is worth the extra step.
* Search engines don't love bots. Getting reliable web results was a bigger challenge than getting good text out of the model.
* A provider abstraction pays for itself. I added a layer so the pipeline isn't hard-wired to one LLM vendor, which made swapping models a configuration change rather than a rewrite.
* Once other people can use something, the boring parts become most of the work: authentication, rate limits, admin hardening, and terms and privacy pages.

## Current status

The site is live at [fragrances.supermanzer.io](https://fragrances.supermanzer.io) and I use it every month. It's currently in a private beta. New users join a waitlist, I approve them, and they get an invite. I wrote a bit more about the origin of the project in [Building an AI Fragrance Recommender](/blog/fragrance-recommender).

Since I can't afford to have an API bill run away from me, opening it up meant thinking about cost. I've added Stripe subscriptions with a monthly run quota, so each user gets a recommendation run once a month, and I handle things like lapsed subscriptions and disputes in the app. It has been a nice chance to apply some of the Stripe knowledge from my day job to something of my own.

## Next steps

* Open the beta up gradually and see how the costs actually behave
* Keep tuning the search step, since it determines how good the picks are
* Add features beyond the monthly email once the basics are proven sustainable

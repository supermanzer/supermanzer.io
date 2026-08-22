---
title: Building an AI Fragrance Recommender
description: Discussing my first real application that uses AI
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: /img/supermanzer.jpeg
created_at: 2026-07-24
img: /img/blog/nose_smell.png
---

## What I Built
As I mentioned in a previous [blog post](/blog/working-with-agents), I had been tracking what fragrances I own and using a spreadsheet + LLMs (Claude and Gemini) to help me explore new fragrances.  I wanted to see if I could invert the work, such that the system I used to track my own collection could also do the recommending.  Furthermore, I wanted practice designing a system to programmatically work with LLMs rather than just relying on a web-based chatbot.  

I decided to leverage a set of Raspberry Pis I had sitting around, running Ubuntu server and `microk8s`.  I also decided, while I was prototyping, to run the actual LLM from an open model I could self-host.  A lightweight `qwen` model gave me enough to get started and it still maxed out the fan on my XPS 15.  I learned a decent amount about how to design and implement some basic Kubernetes services and code deployments through this process.  I also realized the limitations of "simple" large language models.  Instructions had to be very clear, leave little room for ambiguity, but I also couldn't provide _too much_ text or the model got confused.  But eventually I got to the point where the only serious deficiencies in my application were the LLM hallucinations and providing HTTPS access. Then, I knew it was time to modify my architecture.

## Moving Beyond a Pi Bramble

I was able to swap out my `qwen` model for using Anthropic directly via the API without moving beyond my Raspberry Pi hosting configuration.  But I also wanted to provide external access with SSL certs and I had previously run into issues using certbot on subdomains so I decided to simplify my approach and just use a Digital Ocean droplet and Cloudflare SSL certificates. It can be tempting to consider self-hosting whne you have multiple computers lying around but the headache of maintaining uptime and the impacts on my home network when I also work from home was too much and I opted to offload that work to the good people at Digital Ocean. 

Once I had this configured I could actually visit my site and now you can too! [fragrances.supermanzer.io](https://fragrances.supermanzer.io) is currently live and fully functional. Well....fully functional _for me_.  All records and operations are locked down to only authenticated users and I currently don't have a mechanism for new users to sign up.

## Current Status and Future Plans

As I mentioned, the site is currently locked down to just myself as a user.  The app works and I have found the recommendations to be interesting so far. I am learning about the different types of bottlenecks such as web search engines blocking bots and how to address those. I even added some public pages to describe what the app is and what it does and moved these outside the authenticated middleware.  I used Claude Code to write the copy after asking it to review some different websites that I thought did a good job of marketing to me. 

Currently I'm still trying to assess the total costs associated with running this site.  Between the DigitalOcean hosting, Anthropic API access, and using Postmark for sending email using REST APIs (DigitalOcean blocks the SMTP port by default), I have some expenses to consider.  I would like to make this feature available publicly but I need to ensure it's sustainable.  In my normal work I come across merchants who have encountered free trial abuse and other shenanigans where an overly permissive approach results in them being out thousands of dollars in a short amount of time.  Since I'm just one guy who likes to build stuff, something like that would be pretty difficult to recover from. 

That being said, I would like to start opening up the service to new sign ups.  I have an idea of a basic functionality that would prevent my costs from exploding and I could gradually roll out new features.  The basic set of features would restrict users to only getting recommendations once a month and prevent any sort of manual triggering.  I should be able to offer this at a monthly price about the same as a cup of coffee (~$4).   

But the most important goal of the project, teaching myself soemthing about building AI powered applications, has already been reached.  Also I like the service it's currently providingso altogether I think his has already been a success.
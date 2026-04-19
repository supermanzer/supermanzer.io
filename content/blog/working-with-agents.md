---
title: Working with Agents
description: Thoughts about using Agentic AI in my personal projects
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: /img/supermanzer.jpeg
created_at: 2026-04-19
img: /img/blog/robot.png
---
## AI for Fun and Learning
I've been building tools at work using AI for over a year now.  At first integrating with GPT models was not the easiest thing in the world and a lot of work went into designing effective prompts and managing context windows.  But now that tooling has become much more robust and the chat interface has moved out of just web applications, I find myself reaching for AI as a tool to help me learn new technologies and build things faster.  This has unlocked a lot of utility but there are also some aspects I think I need to be mindful of.  But first, let's discuss the good stuff.

## Building silly things, faster!
I've found myself many times doing repetitive things and thinking "there should be an app for this".  However, when you look into the available apps, you see that the existing solutions don't do all of what you want, or they do too much, and they all require scooping up your data and turning your usage into a commodity they can trade.  While I have plenty of experience building web applictions and Android applications in the pre-LLM world, getting started often required a significant level of effort just to lay the groundwork before you could start building the things you want.  This was often enough to prevent me from building my "perfect" app.  But in the world of LLMs, this level of effort has been significantly reduced.

For instance, I have been tracking my coffee brewing details in little notebooks. I thought it would be nice to have a very simple Android app where I could store this information. I didn't want any cloud storage or have to sign up for an account and I wanted the UI the way I wanted it.  With the help of Google Gemini built into Android Studio, I was able to scaffold the [Manzer Tracker][def1] in about 2 hours.  I added some basic exercise logging features as well and built out the UI a bit more but I haven't spent longer than 5 hours total and I've got an app that I actually find useful.

The agent has built out a number of features that I don't quite follow (yet).  The specifics of higher level abstractions in Jetpack Compose or the nuances of database trasnactions via Room are something I'm just starting to become familiar with but there again I find LLMs, especially Claude Code, useful in explaining exactly what specific pieces of code are doing.  

## Getting into bigger projects
The ability to get spun up on frameworks and tooling rapidly to build just what you need through LLMs has enabled me to tackle some larger, more complex things as well.  Way back in 2019 I bought a bunch of Raspberry Pis with the intent of building a Kubernetes cluster and teaching myself some more about distributed computing.  While I was able to get `microk8s` running on each Pi just fine, I didn't have a larger project to start building...until now.  

My partner and I are both into fragrances (perfumes, colognes, etc.).  As we are both tech and data oriented, we both have spreadsheets that started with what we own but have expanded to include things we've tried and our verdicts on whether or not we like them.  More recently we've both fed this data into various LLMs to ask for new recommendations based on our preferences and this has had some fun results.  Based on this I wanted to see how easy it would be to build an AI agent that could
  - Read my spreadsheet
  - Identify the fragrances I liked and research them
  - Determine what kinds of fragrances I enjoy
  - Search the web looking for fragrances I might like 
  - Send me an email with a list of recommendations on a schedule (e.g. once a month)

This project has taken more time and resources that my Android app tinkering but I think it's becoming a kind of niche service that I could see gaining some traction.  Like, this is something people (including myself) might actually pay for!  Along the way I've been learning about how Kubernetes manages resources and workloads as well as the limitations of some lighweight open-sources LLMs.  Learning how to be more prescriptive in prompting, building intermediate steps to cache knowledge, and identifying everywhere the LLM could hallucinate a known value and injecting those values are all things I've been picking up quickly while tinkering with a lighweight `qwen` model with _only_ 7B parameters.  The amount of hallucinations is pretty impressive but I do need to remind myself that this is an LLM running on a very outdated Del XPS 15 with only 15GB of RAM.

## Some thoughts on models

I've really only spent significant time with Gemini (in Adroid Studio and as a chatbot) and Claude Code but I can already see some differences in how they are used and how they behave.  For learning new things, I think I find Claude Code more useful as it does a better job explaining what it _will_ do before it does it.  For Gemini in Android Studio, it does the things and then provides a short description of what it does but neither the model nor the UI the chat appears in are very useful for explaining _why_ the code is written the way it is.  I have had much more success asking Claude Code to scaffold projects with the explicit intent of teaching me new things.

However, I do find Gemini as a chatbot is useful in helping me go from a rough idea to an actual plan.  While using my tracking app to log a recent workout, I asked Gemini about how I could share the workout details with Oura.  This got me into learning about Android HealtConnect and on-device data sharing and how I could wire it up.  In rest periods between sets, I also learned about the importance of privacy policies and how I could ensure that user's data is not sent out to the cloud.  

I can't say why I haven't spent more time using ChatGPT other than, I just didn't like the way it was pushed out initially.  I think Anthropic did a better job making me feel like they were actively trying to not destroy humanity.  Given the track record of other large tech companies, *cough* Meta *cough*, I appreciate that approach.






[def1]: https://github.com/supermanzer/manzer-tracker
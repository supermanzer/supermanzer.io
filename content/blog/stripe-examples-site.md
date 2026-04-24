---
title: Rethinking Stripe Integrations on this Website
description: Thoughts I have about whether or not to include example Stripe integrations on my personal website
img: /img/blog/stripe-icon.svg
created_at: Apr 24, 2026
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'
tags:
  - nuxt
  - stripe 
---
A little while ago, I [decided](/blog/rethinking-adding-stripe) against bundling [Stripe](https://stripe.com) integration examples into this site.  I still wanted to build some examples and call out some commom gotchas I see with Stripe integrations.  Also that project offers me the chance to think through how I would present information to allow for a significant amount of content without obscuring the focus.  

## A new site and a new challenge
I wound up creating a separate site using Nuxt & Nuxt Content.  I wanted to see how far I could push a document-driven site when it comes to customized integration examples.  For anyone not familiar with this particular approach to leveraging Nuxt Content, a document-driven approach means that you create new pages on a site simply by authoring new markdown files in your `content/` directory.  A catch-all template file (e.g. `[...slug].vue`) matches every route path and uses the path to look up the correct Markdown file and rengers that content.

At first blush it would seem that this is only useful for rendering your typical HTML elements that can be natively converted from Markdown to HTML like headings and lists.  However, Nuxt Content also supports MDC sytnax which allows you to use components directly in your markdown and write content to defined slots.  Combinig this with some custom composables for handling Stripe-specific configuration and server communication, I had enough to be getting on with.

## Avoiding overcomplications
There is a danger in providing this much easy customization, at least for me.  It would be very easy for me to use this customization as a crutch and a hack for making each page behave differently.  To me, one of the compelling aspects of a document driven site is how it simplifies making a unified design across your site.  The same styles and much of the same components are reused across all pages so everything just feels the same.

However, in order to build Stripe integrations that make sense and demonstrate some common use cases, I will need to leverage a fair amount of custom components and page styles.  I will be trying to strike a careful balance between building as few template (`.vue`) files as I need while not turning my markdown files into a rats nest of custom components.

One concern for the markdown files is that, if I reuly entirely on components in these files, understanding how content is rendered becomes increasingly difficult and inscruitable.  This is a work in progress and I will likely be trying to find the right balance between customization and standardization for the entire time I'm working on this project.

In the meantime, interested readers can find the site at [stripe.supermanzer.io](https://stripe.supermanzer.io).  Further details about how I built the site can be found in the [repository](github.com/supermanzer/stripe.supermanzer.io) which I am keeping public in the hopes that some of these patterns may be useful for Stripe users.
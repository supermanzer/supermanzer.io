---
title: Rethinking Stripe Integrations on this Website
description: Thoughts I have about whether or not to include example Stripe integrations on my personal website
img: /img/blog/stripe-icon.svg
created_at: Dec 23, 2025
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'
tags:
  - nuxt
  - stripe 
---

## The Original Idea
I work at Stripe and my role as a Technical Solutions Engineer involves building and explaining Stripe integrations to Stripe users and other Stripes.  Often times I find myself pointing users to multiple different integration guides and explaining how "If you take this part from guide A and stitch it together with this other part from guide B and then sprinkle in this optional section from guide C, you'll get what you want".  Honestly, I think the are many interesting and powerful ways to combine and configure Stripe products and the fact that my job involves figuring them out and building them is something I find very engaging.  However, I do sometimes think that a working example of an integration more complex and nuanced then our integration guides provide would go a long way to satisfying the needs of some of the developers integrating with Stripe.

It was for this reason that I had thought I might try my hand at building out some of those integrations in this site.  I spent some time thinking about whether I would go simple and start by replicating some basic integrations with [Checkout Sessions][def1] and the [Payment Element][def2] or build out something more complex.  I was curious to explore how I could design the components and composables for this effort that would allow me to embed links to docs and provide explanatory text in tooltips and menus. I have an admittely hazy idea that there are ways to add a lot of instructional content without putting up walls of text in front of developers. Ultimately, I wanted to have some examples I could point Stripe users at where they could test some of these integrations end-to-end and see the underlying code.

## Adjusting Expectations
After a while, I started thinking about just _how many_ Stripe users might be coming to this site.  That made me realize that, even if my integrations were only remotely useful, it would quickly become the dominant source of traffic.  Another consideration is maintenance.  If I built something that is actually useful to people, my teammates would likely also start referring people to it.  In that scenario, the demand for new integrations may outstrip my ability (or desire) to continue building them.  This is my personal site that I build on my own time, after all. 

With all of that in mind, I decided that I should _not_ build my own Stripe integrations into this site.  I do still want to build them and I think I can take advantage of key Nuxt features like Nuxt Content to provide explanatory text to help people understand the integrations.  When I do get a new site up and running for these, I will post about it here.  But I intend to keep these efforts separate so I can continue to write posts about my own interests, share my photography, and discuss my projects without my work life taking over.



[def1]: https://docs.stripe.com/payments/checkout/how-checkout-works
[def2]: https://docs.stripe.com/payments/payment-element
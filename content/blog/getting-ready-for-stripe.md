---
title: Getting ready for Stripe Integrations
description: Deciding how to showcase my Stripe integration skills and provide educational content
img: /img/blog/stripe-icon.svg
created_at: 2025-05-10
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'
tags:
  - nuxt
  - stripe
  - photography
---
## My Idea
I have had this plan to build out some examples of Stripe integrations on this site for a while now. I even created it with a Stripe section. However, it has always taken a back seat to other priorities like my [Photos section](/photos). As I have integrated some newer Stripe technologies using approaches I think are pretty creative and provide good examples of how to make use of newer functionalities, I wanted a way to share what I have learned. I often find that, if I want to really understand something, one of the best ways is to try and teach it. Also, I think designing an example integration that includes educational components to explain the _why_ of an integration as well as the _how_ presents some fun challenges and opportunities to flex my web dev skills.

## Why Stripe?
Full disclosure: I work at Stripe, and building integrations so I can assist users is one of the core components of my 9-5. I do try to keep my work life and personal life separate in general, but in this case, I find building integrations to be the part I enjoy the most. Recently, I was helping users at our annual user conference, Stripe Sessions, and after showing my own example integrations to help explain features like [Elements with Checkout](https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=embedded-components) and [Active Entitlements](https://docs.stripe.com/billing/entitlements), users were asking if there was a public site where they could review these examples. Finally, I was inspired by my colleague who built the examples at [4242.io](https://4242.io/test/). I wanted to use the inspiration and put my own design spin on that kind of approach.

## Content and Design Choices
When I try to envision the types of integrations and educational information I want to present, I find I get a bit torn between wanting to provide as much information as possible to make it clear why I am doing what I am doing and avoiding unnecessary clutter and overloading my readers. This is a balance that I know the [Stripe docs](https://docs.stripe.com) try to strike as well. Furthermore, I have yet to determine whether it makes sense to attempt to design each example integration as its own endeavor or if I want to construct an entire design system to unify the user experience and make each successive integration easier to understand. I can easily get ahead of myself, and I know that pre-optimization can be the death of a good project, so I will try to focus my efforts (at least initially) on making something useful. If this effort starts to increase in scope and complexity, I will take a stab at building some sort of basic design system to make it easier to build new integrations with a consistent pattern.

With respect to content choices, I am trying to decide whether it makes sense to start with basic integrations like [Embedded Checkout](https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=embedded-form) and a simple [Payment Element](https://docs.stripe.com/payments/payment-element) or dive into reproducing my integration of [Active Entitlements](https://docs.stripe.com/billing/entitlements) paired with [Nuxt middleware](https://nuxt.com/docs/guide/directory-structure/middleware) to showcase how this feature can make it easy to provision access to content and services. I don't want to replicate what is already in Stripe docs, but there is also a risk in getting bogged down with the more complicated integrations. I will have to consider what balance to strike.
---
title: Tracking usage of Supermanzer.io
description: Dipping my toe into the world of measuring the use of a public website
img: /img/blog/analytics.png
created_at: 2025-09-06
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'
tags:
    - website
    - analytics
projects:
    - website
---
I started this project with some vague ideas about wanting to better understand modern technologies used for building websites.  I had previously used [Nuxt][def1] to build some fun interfaces for custom software applications and I liked the idea of having a public site where I could share my thoughts and ideas.  But I'll be honest, I had not put much thought into how or whether I should put effort into reaching other people.  That may seem strange since I just said I wanted to share my thoughts and how can you share anything if you aren't reaching other people, right? Well I said my ideas were vague, didn't I?

## My Reasons

My partner once asked me if I knew whether anyone was visiting my site and I had to honestly say, I had no idea. This got me thinking about what it would take to change that. Another nudge in this direction is my experience working at [Stripe]. We frequently host guest entrepreneurs who share how they use analytics to understand their users and grow their businesses. Hearing their stories made me realize that even for a small personal project, having some insight into usage can be motivating and informative. Furthermore, I have seen how important gathering usage information is to understanding how others experience the things you've built. I realized that having measurements of who was visiting my site and what parts were the most engaged with would provide me insight into how well my ideas are being received.


## What I Did 

I decided to use [Google Analytics][def3] because they're the most obvious and well documented website analytics I knew.  So I [set up a project][def4] and configured it to track users on https://supermanzer.io. However, as other users of Nuxt will know, you mostly don't write your own `<head>` sections for your webpages.  You configure different options for scripts and metadata and the framework builds the actual HTML for you.  I tried a few versions of loading the correct JavaScript file along with the project ID but I wasn't getting any tracking (even of my own test traffic).

Finally I stubled upon what seems like a hacky work-around but it got the job done. In the `nuxt.config.ts` file where you configure a Nuxt application, in the `app.head.script` array where I had up until now just loadied script sources using the `{src: "/path/to/js"}` approach, I added the following

```javascript
innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-{{TAG}}');
          `
```

This finally did the trick! I was able to see users coming to my site, or at leats that what I think I'm seeing. To be honest, I really need to spend some time learning about the data being gathered and how I can interpret it.  But I'm definitely, mostly sure I was able to see the traffic to my site.  What I learned is that it was very very very little.  

This made perfect sense to me though.  I had made very very little effort to publicize this website on social media.  And I had actively resisted doing things just to be SEO friendly.  However, as I said earlier, I was starting to think that if I was going to have any impact by sharing things I found beautiful like my [photos](/photos) or potentially helpful like some of my blog posts on tech, then I want to make it easier for people to find my stuff.

## What's Next

First, I need to watch some Youtube videos and go through some tutorials on Google Analytics.  I'm starting to get data that I'm curious about and I think there is more I can learn about how the few users I do see are engaging with my site.  Second, I will start to put a little effort into making the site easier to find.  I've noticed that Google is attempting to index pages that don't exist so I think publishing a sitemap would help.  Additionally, one of the selling points of Nuxt's Server Side Rendering (SSR) mode is good Search Engine Optimization (SEO) since the crawlers reading your site get the actual content.  I will spend a little more time understanding how I can make it easier for people to find my stuff.

Once I have that in place, well then the pressure is really on!  If I make it easy for people to find my site, I better start putting up stuff that they will find useful, funny, engaging.  I may need to look into more interactive elements and ways to gather feedback. This entire blogging framework is built on markdown files using [Nuxt Content][def5] so I'm not sure if/how I could enable comments.  Also, I don't know if that's the way I want to get engagement.  Have you seen some of the stuff that gets posted in comment sections?  😬

One thing that I will **NOT** be doing is turning this site into a wall of banner ads or using nefarious cookies to track your traffic across the web.  I think those are gross misuses of a technology that was, at least partially, designed to bring us together through voluntarily sharing of information.  I do plan to make use of cookies but for things that pertain to this site.  I want to implement good looking light/dark modes and allow users to configure one as their default.  I want to build out a complex Stripe integration using [Active Entitlements][def6] and a basic [Nuxt Middleware][def7] implementation.  These will be website cookies that enable functionality on this site and help me explain concepts I find interesting.  I look forward to implementing those and collecting consent for any user of your browser storage.

I hope we can all continue to build things that excite and delight us, making the web a little more fun and interesting.

[def1]: https://nuxt.com
[def2]: https://stripe.com
[def3]: https://analytics.google.com
[def4]: https://support.google.com/analytics/answer/9304153?hl=en
[def5]: https://content.nuxt.com
[def6]: https://docs.stripe.com/billing/entitlements
[def7]: https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware
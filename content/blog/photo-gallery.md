---
title: Integrating Photography with Web Dev
description: Taking my budding new hobby of photography beyond Instagram by building my own photo gallery.
img: https://t4.ftcdn.net/jpg/04/96/47/13/360_F_496471319_DbtjoUvKqyy2e9OfgBnK5mm2AXhKpa9m.jpg
published_to_twitter: false
created_at: 2023-05-25
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'
tags:
  - vuetify
  - webdev
  - photography
projects:
  - website
  - photos
---

## Inspiration

I have to give credit where credit is due. My good friend Lucas saw some of my photos and made a comment about me spinning up a photo gallery and I thought to myself "Well you can just follow my Instagram.....wait, that would be a fun thing to add to my website!" As I thought about it driving home from Costco, it did sound like a fun project and a way to put two hobbies together. However, this is no small topic so I'm writing a post about it to share what my intentions are before starting. I can get into the weeds of a project and lose sight of what my original intent was so it helps to write it down.

## Approach

I built this site, I built this site on rock n' roll....no, wait a minute.

I built this site using [Nuxt][def0] and [Vuetify][def6] (v3). So it makes sense that I will build out the image display and layout portions using Vuetify components. I'm looking at the [Image][def1], [Carousel][def2], and [Dialog][def3] components. This seems to me a like a good place to start. To keep things simple at first I think I'd like to try and replicate the Instagram grid, potentially with some custom sorting options. I will likely have more thoughts on this as my ideas start to get built into components.

I am using [Netlify][def4] to host this site and the [Nuxt Image module][def5] allows for pretty easy integration between Nuxt and Netlify's image CDN, I think that will be a good place to get started.

## Initial Results

I have made use of the Vuetify `v-img` element along with some of [Nuxt Image's][def5] tooling for using image CDNs to serve up lower resolution versions of the same file for smaller thumbnail representation. I have combined Vuetify's `v-img` with the `v-dialog` element to display a number of my photos in smaller thumbnails in the grid but allow for a higher resolution version to be displayed, along with camera nerd details like shutter speed and ISO, in a modal dialog that takes up the width of the browser.  I will likely refine this a bit going further but so far I like what I've got. 😁

[def0]: https://nuxt.com/
[def1]: https://vuetifyjs.com/en/components/images/
[def2]: https://vuetifyjs.com/en/components/carousels/
[def3]: https://vuetifyjs.com/en/components/dialogs/
[def4]: https://www.netlify.com
[def5]: https://image.nuxt.com/
[def6]: https://vuetifyjs.com/
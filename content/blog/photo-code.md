---
title: Coding Solutions for Photography
description: Writing software to make it easier to post and share photos on my site.
img: /img/blog/python.png
created_at: 2025-01-10
udated_at: 2025-04-20
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'
tags:
  - python
  - code
  - photography
projects:
  - website
  - photos
---

## Something was bugging me
I was building out the basic UI components to display my <a href="/photos">photos</a> here on my site and I realized that I wanted to display some of the image metadata I can see when I open the iamges in software like <a href="https://www.darktable.org/">Darktable</a>.  I thought this kind of information would be something other photographers would find interesting.  Also, since I'm really an amateur and just getting started in my photography journey, I wanted a way to keep track of the settings I used in different photos on my site. Additionally, I wanted a way to add photos to my media directory and automatically have those rendered on my site.

My first thought was that there must be some JavaScript library that could handle both problems.  After looking around, I wasn't seeing anything that seemed to work the way I had envisioned.  I did realize there was one tool I was already using that _kind of_ did what I wanted.  

## Leveraging Nuxt Content

I am already using <a href="https://content.nuxt.com/">Nuxt Content</a> to provide most of the text you see on this site.  It offers a simple, file-based, Content Management System (CMS) and provides a very intuitive interface for querying documents.  My Projects & Blog pages query their respective content directories to render their card components.  I realized that I could use a similar approach for showing my photos if I had a corresponding Markdown file that included the path to the image file as well as the details I was looking for.

However, this got me back to wondering if I would be stuck manually creating markdown files every time I wanted to add a picture.  I knew that added friction would eventually mean I stop adding new photos.  There had to be some way to improve this.  That sounded like a good job for code!

## Writing an Exif Parser

<a href="https://en.wikipedia.org/wiki/Exif">Exif<a> is a format for storing metadata for image and audio files.  It is a universal standard used to encode this data and many applications are desgined to read it.  So this gave me something to start researching.

Once I had decided I should code my own solution for the problem I was facing I started by determining exactly what my solution should do. I wanted a program that could 
- Scan all the `.jpg` files in the `/public/img/photos` directory
- Scan all the `.md` files in the `/content/photos` directory
- Where my code finds a `.jpg` but no matching `.md` file, do the following
    - Read the Exif data from a `.jpg` file
    - Create a markdown file in `/content/photos` with the same file name as the `.jpg`
    - Write Exif data to the front-matter section of that markdown file, along with the file path of the `.jpg` file (stripping out the `public` directory and anything before)
    - Save the markdown file to the `/content/photos` directory

Thankfully the most popular Python library for handling images, <a href="https://pypi.org/project/pillow/">Pillow<a>, has the ability to read Exif tags and parse them out.  Once I found that, I was able to quickly stitch together a script to handle this for me.  I wrote this specifically for the way my site handles content so many of the details are hard-coded.  I do intend to make it more general purpose through some configuration values that I, or anyone else, could set.  If you, dear reader, want to make use of this application you will likely need to modify the code somewhat.  However, please feel free to take it for a spin.

You can find the code [here](https://github.com/supermanzer/photo-info).  As I mentioned above, this is currently written in Python (my love language).  However, it strikes me that this kind of processing might be something I could re-write in Rust!

## Update
I spent a little more time working on this and, while it's still not published to PyPI...yet, I think it's at a point where it's really useful.  I've built it out as a feature complete Command Line Application including `--help` flags and other useful commands.  In fact, this has come so far I decided to add it to my [Projects](/projects).
---
title: Photo Info CLA
description: A command line application used to generate markdown files populated with EXIF data from hosted image files
banner: /img/projects/code-typing.jpeg
status: Complete
version: 0.1.0
links:
  github:
    url: https://github.com/supermanzer/photo-info
    icon: mdi-github
    text: View on Github
lead:
  name: Ryan Manzer
  bio: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'

---

## Problem

I wrote about this a bit in my [blog post](/blog/photo-code).  Basically, I decided to start using this website to display my photographs to combine my hobbies of website development and photography.  The problem I was rapidly running in to was how I was expected to display a new photo I wanted to share.  I could hard-code an arrary of images but I really wanted to showcase the metadata such as camera, lens, shutter speed, etc. I quickly realized that, if I kept having to copy/paste this data back and forth for every photo, I would soon give up.  There had to be a better solution

## What I Built
After doing some research I quickly settled on using the [Pillow](https://pypi.org/project/pillow/) Python image library to provide access to [Exif data](https://en.wikipedia.org/wiki/Exif) stored as metadata on the image files.  This is the data you see in image file editors or image library applications.  When your phone stores the location of the photo you took, it's saved to the Exif data.  

Once I had Pillow for reading the data I just had to decide what tags I wanted to write out to a file.  I decided to store this data as Markdown because that would allow me to leverage Nuxt's [Content module](https://content.nuxt.com/) to automatically query and display these images.  I wrote some Python functions that 
* Scanned a given directory to get the names of all files ending with `.jpg`
* Scanned a given directory to get the names of all files ending with `.md`
* Use the filenames to identify any image files that did not have corresponding markdown files
* Generate Markdown files that stored the Exif tag data as [front matter])https://frontmatter.codes/docs/markdown)

After that I wrote some tests that validated all of this functionality and felt pretty accomplished. But after a while the lack of easy configuration started to annoy me.

## Let's Get Serious

I realized that, while I still wanted to focus on command line use, the current approach to using this tool (using the following syntax)  felt pretty janky.

```python
  python /path/to/file.py /path/to/images /path/to/markdown
```

I wanted to have a more slick CLA (Command Line Application) interface.  I did some more research into using Typer and rich to support better command line arguments and responses. Then I did a wee bit of vibe coding to get everything up to a basic industry standard. I still think developers need to have the core of their idea written themselves first otherwise I think vibe coding is a bullet train to mediocrity.  But on the flip side, I was able to build out a pretty sweet interface in less than an hour and now I have something I think other people might find useful.

It isn't _currently_ available through the Python Pacakge Index (PyPI) but you can clone the [repo](https://github.com/supermanzer/photo-info) and run `pip install -e .` to install it.  I've added a few GH Issues to the repo to keep track of enhancements that I think it needs but feel free to add your own.
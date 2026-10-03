---
title: Bean Buddy Coffee App
description: My personal coffee + data nerd dream application.  Tracking coffee roasters, bags, and individual brews along with ratings. I use this to help make tastier coffee at home.
tech: Android
status: In Progress
version: 0.0.1
banner: /link/to/hero.image
links:
  github:
    url: https://github.com/supermanzer/manzer-tracker
    icon: mdi-github
    text: View on Github
published_to_twitter: false
lead:
  name: Ryan Manzer
  bio: He puts the Manzer in Supermanzer
  image: /img/supermanzer.jpeg
---
### Motivation
I've been tracking the details of my coffee brewing for a while now.  Roasters, bags (origin, process, roast date, etc.), and brew session (grind size, brew temperature, coffee:water ratios).  All of this has been in pursuit of more flavorful coffee.  I used to use small notebooks that I kept near my kettle but after a while the collection of notebooks became unmanageable.  This seemed like another use case for an Android application.

### Design
I knew I wanted to avoid storing data on a server.  It would add a ton of overhead and honestly, most apps that store data on the cloud are doing it so they can mine it for their own purposes.  SQLite databases take up really tiny amounts of storage and are very performant in terms of read/write speeds; much better than most internet connections.  Your coffee brewing is your business!

So I built this application around a centrald SQLite DB, Data Access Objects (DAOs), and Data Entities (tables).  At first all I did was log each roaster, bag of beans, and individual brew.  This still was sufficient for me to see my ratings of each brew and the specifics so I could dial in my morning cup: Last brew too bitter? Try coarser grind size. Good flavor but a little thin? Try higher water temp, and so on.

### Style
I'm trying to flex a little more stylistically on this application.  Since I'm not an expert in Jetpack Compose, I'm leveraging AI to help me with this.  It's proving to be a useful learning experience as well as I've documented [here][compose-blog].

[compose-blog]: /blog/learning-compose-by-reading-what-ai-wrote
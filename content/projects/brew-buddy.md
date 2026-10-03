---
title: Brew Buddy Coffee App
description: My personal coffee + data nerd dream application.  Tracking coffee roasters, bags, and individual brews along with ratings. I use this to help make tastier coffee at home.
tech: Android
status: In Progress
version: 0.0.1
banner: /img/projects/coffee_pourover.jpg
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
I've been tracking the details of my coffee brewing for a while now.  Roasters, bags (origin, process, roast date, etc.), and brew session (grind size, brew temperature, coffee:water ratios) all get tracked asl well as I can.  All of this has been in pursuit of more flavorful coffee.  I used to use small notebooks that I kept near my kettle but after a while the collection of notebooks became unmanageable.  I had to repeat all the details about the bag for each brew or each note became useless as a reference.  Also I was stacking up lots of notebooks.  This seemed like another use case for an Android application.

### Design
I knew I wanted to avoid storing data on a server.  It would add a ton of overhead and honestly, most apps that store data on the cloud are doing it so they can mine it for their own purposes.  SQLite databases take up really tiny amounts of storage and are very performant in terms of read/write speeds; much better than most internet connections.  Your coffee brewing is your business!

So I built this application around a centrald SQLite DB, Data Access Objects (DAOs), and Data Entities (tables).  At first all I did was log each roaster, bag of beans, and individual brew.  This still was sufficient for me to see my ratings of each brew and the specifics so I could dial in my morning cup: Last brew too bitter? Try coarser grind size. Good flavor but a little thin? Try higher water temp, and so on.

### Style
I'm trying to flex a little more stylistically on this application.  Since I'm not an expert in Jetpack Compose, I'm leveraging AI to help me with this.  It's proving to be a useful learning experience as well as I've documented [here][compose-blog].  Most of my formal training in Android used the legacy Views approach where UI was defined in XML files and all state was managed in Activity/Fragment/ViewModel objects.  With Compose, the UI is bound to the data and recomposes whenever things change.  Theere is a lot of optimizations around linking recomposition to the data you care about that I'm just starting to get familiar with.  If you're not careful, you could have your UI re-calculating state for every pixel shift in a scroll animation.  I haven't implemented any kind of CPU monitoring (I don't even know if you can do that) so I would only notice when my phone gets really hot and drains my battery like crazy 😅

I point to specific examples in my [blog post][compose-blog] so if you're curious feel free to check it out.

### Getting into Data
For a while, this was just a simple way to create a view records in chronological order.  I've been using it like that for aw while now and I have ~100 cups of coffee logged (I usually stop logging once I've found my sweet spot and don't plan on adjusting my brewing).  I started wondering if I could use the data I'm collecting to better predict the quality of my first cup with a new bag.  It also occurred to me that, if I kept logging brew over time, I might see the progression of flavors as the bag of coffee ages; although a standard bag of coffee rarely last more than 10 days in my house.

I recently added a section on Insights to help me track how I've scored by roasters, bags of coffee, and the configuration (grind, temp, ratio) that produces the best cup of coffee. I'll be honest I haven't been great about always getting around to giving a rating even when I do create a new Brew record but I think having a section of the app that consumes this data and makes it useful will give me more incentive.

### Next Steps

This one I think I might try to publish to the Google Play store.  That will be it's own learning journey.


[compose-blog]: /blog/learning-compose-by-reading-what-ai-wrote
[fragrance-journey]: /projects/fragrance-journey
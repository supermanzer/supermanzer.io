---
title: Why I Code
description: What got my into coding
parallax_image: /img/about/2.jpeg
---

I got started coding, almost simultaneously, in two different contexts.

While working in a program administration office, I realized the inefficiencies of managing a large and complex program using spreadsheets on shared network storage and I resolved to find a better way. This lead me into the world of databases and data modeling.

Pursuing my M.Sc. in marine science, I took a course on mathematical modeling methods commonly used in oceanography. Here I got into data retrieval and computational analyses.

Both approaches lead to very different types of projects. One thing has been common throughout. Building things with code feels as fun as using Legos when I was a kid. Except I never stepped on a stray Docker images on the way to the bathroom so I think coding wins. 😁

## Academic Coding

My academic coding started with building mathematical models of oceanographic processes, using the MATLAB programming language and IDE. From mutli-box models to define the flow of nutrients throughout the world oceans to 2D advection-diffusion models of the dispersal of pollutants into the surface water, I got to dig into some fun and nerdy topics.

For my M.Sc. thesis, I focused on physical mechanisms' influence on coastal phytoplankton by analyses of public data sources.  After building out more and more complex one-off scripts and having to tweak and re-run them, I wound up coding my own MATLAB ETL package for retrieving and processing [NDBC][def1] buoy data.

In addition to this I wrote many scripts for performing analyses and visualizing results. This is where I got my start in another passion of mine, data visualization. As my Physical Oceanography professor was fond of saying, if you don't visualize your data you don't understand it. While most of my academic coding was in MATLAB, all it takes is one licensing scare that threatens to derail years of work to make one realize that perhaps an open source alternative would be a better approach.  Python was a a natural fit as I had already realized just how much scientific coding and data visualization packages exist for that language.

I have since found myself working on projects not related to my previous research. I still want to write more code for scientific analysis and data modeling but the more I learn, the more project ideas I have and want to work on.  I have a loose idea for building an application that would automate checking different data sources for conditions of interest in NDBC buoy data and trigger larger data collection and analysis if those conditions are met.  I'd love to get to that but it's currently below the cut line for my project priorities 🤓

## Business Coding

Since I got my start coding in the workplace in order to replace tracking data through spreadsheets, it should be no surprise I found myself creating databases and database applications.

I started in MS Access because

1. All our office computers already had it installed.
2. It played nice with Excel and Outlook.
3. My employer had a subscription to an education platform that included a series on building applications in MS Access.

Now I primarily use open source web tech like Django, PostgreSQL, Docker, etc. I find that using web frameworks simplifies the process of getting a user interface in front of my users and it provides a great deal of flexibility in how that UI looks/feels. From the start, I've enjoyed building the logic of the business into the business logic of my applications. In the program administration I built automated views of the records that needed the most immediate action.

In a recent large-scale project, I was automating manufacturing schedules based on placed orders. It allowed users to customize the rules that govern how orders get translated into manufacturing batches. Every time I take on a business project I find myself learning how to abstract more, hard-code less, and provide more intuitive interfaces. I'm surprised how much I like doing this stuff!

I got started building websites to connect to data applications because it provided the most flexible and capable UI to present all the information I was working with.  However, now I am taking what I have learned a building a site simply to share what's on my mind and things I am doing.


[def1]:https://www.ndbc.noaa.gov/
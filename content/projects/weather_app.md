---
title: Android Weather App
description: A personal Android application that I am working on to sharpen my Android coding skills.
banner: /img/projects/weather.webp
tech: Kotlin, API
status: Complete
version: 0.1.6
links:
  github:
    url: https://github.com/supermanzer/WeatherApp
    icon: mdi-github
    text: View on Github
lead:
  name: Ryan Manzer
  bio: He puts the Manzer in Supermanzer
  image: '/img/supermanzer.jpeg'
---
## Goal
My intent with this project was to develop my Android programming skills while builidng an app that I think we are all familiar with and use regularly.  This kind of app also involves learning a number of useful paradigms in Android programming, such as
* On-device database usage - for storing saved locations
* API querying - Converting location names into Lat, Lon and getting forecast data
* Device permissions - Using approximate device location to localize the default forecast will require checking and requesting permission to get this information from the device.

## Implementation
I decided to use the classic Views based architecture to keep the new topics to a minimum.  I store location records in a local SQLite DB and query National Weather Service APIs to fetch forecast data.  I use Google's locations API to translate a place name into a place with lattitude and longitude.  

There are still plenty of enhancements I could see making as well as some styling bugs I would like to fix but I'm trying to practice setting realistic goals and, once I reach them, taking some time to evaluate what I want to work on next.  This helps me avoid going down coding rabbit holes with no deliverable result.  I'm currently taking a pause on this application to work on other things, like this website.

## Known bugs

* Not all the contents of the daily forecast list view are displayed when scrolling - [GH Issue](https://github.com/supermanzer/WeatherApp/issues/6)
  * I think this is because of a conflict between fragment layout resources and the activity layout
  * Despite setting every `layout_height` to `wrap_content` on every layout file, I'm still seeing scrolling inside the child fragment.
  * I would much rather have the entire app scroll down but enabling that is proving frustrating

## Potential Enhancements
* Cache the last location selected by the user and display that location upon re-opening the application
* Use device locatin and create a "Current Location" `Location` record
  * This would involve implementing perission requesting and permission checking - good practice
* Implement caching of forecast results
  * This could improve responsiveness of the app (e.g. load cached forecast while performing the request for new data)
* Move location selection widget to app bar
  * This would free up space inside the app for more content


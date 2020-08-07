---
layout: talk
title:  "Microapps: A Covid-19 Case Study"
date:   2020-08-11 16:00:00
videoURI:
slidesURI: /slides/2020-08-covid-microapps
slideContentURI: ./slide-text/2020-08-covid-microapps
---

Remote talk for [UCTech 2020](https://uctech.ucla.edu/) at UCLA.

**Learn how we used AWS services and Github Actions to deploy a very small (65 line) Node.js script into a rock solid secure production environment quickly in a crisis.**

In the days immediately following the shelter in place order keeping track of the health, welfare, and availability  UCSF was a top priority, but there were very few systems in place to track and report this information. While a data collection tool was quickly created it was necessary to send daily reminders to staff to complete surveys, and view dashboards. Working with Graduate Medical Education staff we designed, built, and deployed a small application to accomplish this task in just four days.

Four days from ideation to production is a very fast, when it includes continuous delivery and deployment, sending emails that meet UCSF's stringent security requirements, and iteration on the message and design it is light speed.  How did we get this done so quickly?

#### Github:
By hosting the code in Github and taking advantage of Github Actions for deployment we didn't need to integrate any other tooling and could use a standard process to push, tag, and deploy the app.

#### Serverless Framework:
Using a pre-built framework meant less boilerplate code to write and less to test and validate. Serverless makes it easy to declare what an app is supposed to do and when it should do it all we had to do was write the code.

#### AWS:
We took advantage of AWS Lambda, Cloudwatch, and Simple Email Service to do the heavy lifting of scheduling and running the jobs as well as sending the validated email.

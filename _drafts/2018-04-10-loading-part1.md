---
layout: post
title:  "Ready Set Go, Loading Single Page Apps Fast Part 1"
date:   2017-07-20 22:01:00
categories: spa javascript loading
originalURI:
---

## Summary

The default loading experience in a single page application isn't great. Unlike a traditional
server rendered HTML page there is no content for the user to see until the application is 
completely loaded. For users this means looking at a blank screen while assets are
fetched and then a sudden pop in appearance of the complete application. We can do better 
without a lot of effort by organizing the way our assets load and providing something
for users to look at while this happens.

Part one of this series will discuss the tradeoffs and decision points to consider when 
choosing a loading strategy.

## Focus on the First Visit?

One critical inflection point for loading is the first boot vs subsequent visits. Users
visiting your application for the first time have no cache to rely on and need to load 
everything from scratch. Understanding your audience and content will help you decide 
how much attention you need to pay to first-boot users.

### Know Your Site

Is the killer feature of your application content or interaction? If you're building a news 
application then users are probably there for your content and any interaction is just a bonus. On 
the other hand an exercise tracking application may be useless without the ability to input 
data and interact with it. Understanding your content will guide your decisions around loading.

### Know Your Users

Do your users tend to stay in your application for hours at a time? Or just stop in to glance
at a link from their social feed? Are you users primarily mobile? Do they generally have fast
network connections? Understanding your users will make many loading decisions much easier.

## Is Server Side Rendering right for your application?

### What is Server Side Rendering (SSR)?

SSR is the process of generating a static representation of your site on the server and sending
that HTML to the users browser. This makes your single page application function like a traditional 
web application. The server generates just the HTML and CSS needed to represent a single URL which makes
it fast to download and render even on slow connections.  This is followed by a process of 
re-hydration in which the browser downloads the full payload for your application and hands off control to the 
javascript application once it has booted.

### OK, So What's the Downside to SSR?

Rendering your application on the server is much more complicated than serving static 
HTML, Javascript, and CSS. It requires a (usually Node.js) process to be running to handle requests
and introduces many additional dependencies. The re-hydration process can be very difficult to get right,
especialy with authenticated users and in some cases will result in an annoying flicker and scroll reset on the 
page when the application takes over. If you're planning to work with SSR you should take that into account as early
as possible in the design phase so you can account for these inconsistencies.


## Make Good Choices

Now that you understand your content and your users you can decide if you need to render 
your application on the server or if the simpler choice of improving the loading experience 
in the browser will work for your application. The rest of this series will focus on getting
loading in the browser right.


 [@iam_jrjohnson](https://twitter.com/iam_jrjohnson).

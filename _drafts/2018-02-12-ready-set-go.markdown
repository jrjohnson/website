---
layout: post
title:  "Ready Set Go, Loading Webapps Fast"
date:   2017-07-20 22:01:00
categories: ember javascript serviceworker loading
originalURI:
---

# Summary
We spent a lot of time on the load performance of our application last year and

# Tradoff Warning
This is an exploration of our journey. I've tried to indicate those points where your journey will be different, but this isn't
a map. We're not all going to be trying to reach the same place with the same amount of effort. 


# Anatomy of a Single Page Application
## index.html
The first thing single page app users need is the index.html file. It's going to contain links to the styles, and scripts necessary
for your application to function. The index.html file is loaded once at the begining of each session and without it your application
will not and cannot function.

## styles
The CSS that controls the look of our application. In order to avoid displaying un-styled content to the user styles are generally loaded 
in the `<head>` of our `html` before any content as browsers block rendering of your page until all of the style sheets are loaded. 
Styles don't have to be links to external files though. They can be "inlined" in the html directly and delivered with your `index.html`
content.

## scripts
The App that is your app. For single page apps javascript makes the world go round and this is likley the largest single 
part of your application.  Most of the time we put `<script>` tags at the bottom of our content because browsers will happily render
all of the content before a `<script>` tag, but once the tag is encountered interaction stops until the script is fetched and parsed.

# What loading looks like:

fetch index -> parse index file -> start fetching resources (styles, scripts) -> parse any inline styles or scripts -> load any content that appears before loading files
-> finish loading files -> load any content that appears after files -> start responding to instructions in our app ->
render content from our application -> load data our application needs -> render more content -> repeat until death.

# What loading looks like for users by default
Follow link -> See content of index.html with styles -> see nothing happening (because scripts are loading) -> suddenly see our app -> begin to interact with the app




## Where server side rendering (SSR) fits into this picture
SSR can be the answer to all of our load time woes. If your app is primarily composed of public content 
that is not customized for the authenticated user then SSR can deliver a static HTML experience to the browser very quickly.
SSR wasn't a great solution for us because in Ilios the most useful initial experience for users is a schedule of their upcoming activities. This information 
is not only personal, it is ever changing. We decided to forgo SSR in our case as the added complication of re-hydration and hosting
would not significantly improve our users experience.


# No Script

# Loading indicators

# Caching

# Service Worker

# Component Data loading

 [@iam_jrjohnson](https://twitter.com/iam_jrjohnson).

---
layout: post
title:  "Ready Set Go, Loading Webapps Fast"
date:   2017-07-20 22:01:00
categories: ember javascript serviceworker loading
originalURI:
---

# Summary
How we improved the loading performance of our application and dramatically improved
the experience for our users.


# Anatomy of an Ember.js application
## index.html
The first thing users need is the index.html file. It's going to contain links to the styles, 
and scripts necessary for your application to function. The index.html file is loaded once at 
the start of each session and without it your application will not and cannot function.

## styles
The CSS that controls the look of our application. In order to avoid displaying un-styled 
content to the user styles are generally loaded in the `<head>` of our `html` before any 
content. Browsers will block rendering of your page until all of the style sheets are loaded. 
Styles don't have to be links to external files though. They can be "inlined" in the html 
directly.

## scripts
The App that is your app. For single page apps javascript makes the world go round and this is 
likely the largest part of your application.  Most of the time we put `<script>` tags at the 
bottom of our content because browsers will happily render all of the content before a 
`<script>` tag, but once the tag is encountered interaction stops until the 
script is fetched and parsed.

# What loading looks like:

fetch index -> parse index file -> start fetching resources (styles, scripts) -> parse any inline styles or scripts -> load any content that appears before loading files
-> finish loading files -> load any content that appears after files -> start responding to instructions in our app ->
render content from our application -> load data our application needs -> render more content -> repeat until death.

# What the default loading experience looks like for users:
Follow link -> see nothing happening (because scripts are loading) -> suddenly see our app -> begin to interact with the app


## Where fastboot fits into this picture
Fastboot (server side rendering) can be the answer to all of your load time woes if your app is 
primarily composed of content that can be viewed without needing to interact with it. 
SSR wasn't a great solution for us because, for us, the most useful initial experience for users 
is a schedule of their upcoming activities. This information is not only personal, it is ever 
changing. We decided to forgo SSR in our case as the added complication of re-hydration and 
hosting would not significantly improve our users experience.


# No Script


# Loading indicators


# Caching

# Service Worker

# Component Data loading

 [@iam_jrjohnson](https://twitter.com/iam_jrjohnson).

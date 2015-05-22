---
layout: page
title: Posts
heading: Posts I've written collected in one place
permalink: /posts/
---

{% for post in site.posts %}
 - {{ post.date | date: "%b %-d, %Y" }} [{{ post.title }}]({{ post.url | prepend: site.baseurl }})
{% endfor %}

---
layout: page
title: Talks
heading: Talks I've given collected in one place
permalink: /talks/
---

{% for talk in site.talks reversed %}
 - {{ talk.date | date: "%b %-d, %Y" }} [{{ talk.title }}]({{ talk.url | prepend: site.baseurl }})
{% endfor %}

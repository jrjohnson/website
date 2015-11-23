---
layout: default
---

<div class="home">
    {{ site.description }}
</div>

## Recent Posts
<ul class="post-list">
  {% for post in site.posts  limit:2 %}
    <li>
      <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
      
      {{post.excerpt}} <a href="{{ post.url | prepend: site.baseurl }}">...read more</a>
      
    </li>
  {% endfor %}
</ul>

---
layout: post
title:  "A Pattern for Ember Promises"
date:   2015-11-30 14:29:00
categories: emberjs javascript
originalURI: 
---
 - Promises are hard
 - nested returns get complicated quickly
 - Computed property promises are harder
 - Returning a PromiseArray / PromiseObject
 - Bundling everything together with RSVP.all
 - defer as a return makes it easy to see what is up
 - 

## Promises are hard to think about
I find RSVP Promises very difficult to think about.  The basics, sure, but once I get into anything multi level 
it's all a big bag of pain.  I hope that async/await in ES2016 will help me with this, but until then I needed a better 
way to think about promises.  Ember includes and implementation of Promises/A+ which may be slightly different from yours, but 
the basic principal here should work nearly anywhere.


## The idea
What I want to do is keep my promises as flat as possible and understand the return value.


{% highlight javascript %}

var defer = Ember.RSVP.defer();
this.get('stuff').then(function(stuff){
  defer.resolve(competencies);
});
return DS.PromiseArray.create({
  promise: defer.promise
});
{% endhighlight %}
 


## Final Thoughts

If you liked it or hated it let me know [@iam_jrjohnson](https://twitter.com/iam_jrjohnson).

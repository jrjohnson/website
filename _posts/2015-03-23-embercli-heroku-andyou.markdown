---
layout: post
title:  "Ember CLI, Heroku, and You"
date:   2015-03-23 01:15:00
categories: testing emberjs javascript heroku
originalURI: https://blogs.library.ucsf.edu/ckm/2015/03/23/ember-cli-heroku-and-you/
---

**Warning, this is old information and way more work than you need to do.** The solution we are using now is the excellent [heroku-buildpack-ember-cli](https://github.com/tonycoco/heroku-buildpack-ember-cli). 

A disclaimer: This is not for use in production. Doing this for a production app would be a bad decision. 

**The problem**: Developers on the [Ilios Project](http://github.com/ilios/frontend "Ilios Project") need to be able to share their changes with other team members. While it is possible to deploy a static Ember CLI app nearly anywhere, we want to include our mock API so everyone is looking at the same data.

**The solution**: Use Heroku to host an Ember CLI application running its built in Express server. Start by reading Heroku's excellent [Getting Started in NodeJs documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction "Getting Started in NodeJs documentation"). Make sure you set up a demo app as instructed. Now lets create a branch and setup your own Ember CLI app.

{% highlight bash %}
cd [YOUR APP DIRECTORY]
git checkout -b heroku
heroku create [whatever-name-you-want]
{% endhighlight %}

You will now have a Procfile in your apps root directory. Change the contents to:

{% highlight bash %}
    web: ember serve --port $PORT --live-reload=false
  {% endhighlight %}

This will tell Heroku how to start your Ember CLI app using the port of their choice, and to switch off live-reload. Next we need to insure that npm will install bower for us.

{% highlight bash %}
npm install bower --save-dev
{% endhighlight %}

Then we have to modify our package.json to run `bower install` after `npm install`. Do this by adding `"postinstall": "./node_modules/bower/bin/bower install"` to the scripts section.

{% highlight json %}
"scripts": {
  "start": "ember server",
  "build": "ember build",
  "test": "ember test",
  "postinstall": "./node_modules/bower/bin/bower install"
},
{% endhighlight %}

We want to make sure npm installs all of our development dependencies for us. Including Ember CLI itself, this is done by setting a configuration variable on Heroku.

{% highlight bash %}
  heroku config:set NPM_CONFIG_PRODUCTION=false
{% endhighlight %}

That should do it. Commit your changes and push your branch to Heroku. If everything works, merge the branch into master.

{% highlight bash %}
$git add Procfile package.json
$git commit -m "Our heroku setup"
$git push heroku heroku:master
{% endhighlight %}

Enjoy!

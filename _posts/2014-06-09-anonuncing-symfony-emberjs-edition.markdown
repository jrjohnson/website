---
layout: post
title:  "Announcing Symfony Ember.js Edition"
date:   2014-08-05 08:11:00
categories: symfony emberjs javascript php
originalURI: https://blogs.library.ucsf.edu/ckm/2014/08/05/announcing-symfony-ember-js-edition/
---
We've spent a lot of time getting the configuration right for setting up (Ember.js)[http://emberjs.com/] and (EmberData)[https://github.com/emberjs/data] to work with a (Symfony)[http://symfony.com/] backend. So we have decided to release a working example of getting this right:
[Symfony Ember.js Edition](https://github.com/ucsf-ckm/symfony-emberjs-edition)

##Background##
The [Ilios](https://www.iliosproject.org) project is investigating a migration to Ember.js. Because we have a lot of PHP experience and a lot of PHP code, it makes sense to serve the content using Symfony. We chose Ember.js because of its convention over configuration approach and wanted to make as few customizations as possible.

[EmberData](https://github.com/emberjs/data) provides a clean way to represent your data models in JavaScript and bind them to templates and controllers. It also has built-in REST functionality for keeping those models up to date on the server.

###Specific Fixes###
####Compiling Handlebars templates####
Ember expects compiled Handlebars templates to be in the JavaScript ```Ember.TEMPLATES``` object instead of ```Handlebars.template```. That's fine if you put all of your templates in ```index.html``` like they do in most examples. In that case, Ember does the compilation itself.

However we wanted separate templates and routers in different files. This required pre-compiling the templates for Ember. Thankfully there is a Node.js application for doing this already called [ember-precompile](https://github.com/gabrielgrant/node-ember-precompile).

It is even supported in the latest version of [Assetic](https://github.com/kriswallsmith/assetic). However [AsseticBundle](https://github.com/symfony/AsseticBundle) hasn't been updated in a while, so we had to mess with the [Composer](https://getcomposer.org) definition to get this working. The Assetic compiler will fail silently if you don't have ember-precompile installed in ```/usr/bin/ember-precompile```. Hopefully a fix for that will be available soon.

###Testing the API###

We want test coverage for our API, but actually getting the right input proved to be a bit complicated. There is a demo controller test and a base test in the AcmeApiBundle in this distribution. You can use it as a starting point to make writing other tests easier.

###JS Dependencies###
We use [Bower](http://bower.io/) to install all of our dependencies, include them in the layout, and manage their version without checking the code into our repo.

None of this would have been possible without:
<ul>
	<li><a href="https://github.com/FriendsOfSymfony/FOSRestBundle">https://github.com/FriendsOfSymfony/FOSRestBundle</a></li>
	<li><a href="http://williamdurand.fr/2012/08/02/rest-apis-with-symfony2-the-right-way">http://williamdurand.fr/2012/08/02/rest-apis-with-symfony2-the-right-way</a></li>
	<li><a href="http://welcometothebundle.com/symfony2-rest-api-the-best-2013-way/">http://welcometothebundle.com/symfony2-rest-api-the-best-2013-way/</a></li>
</ul>

{% highlight javascript %}
"boot_command": [
  "",
  "/install/vmlinuz noapic preseed/url=http://{{ .HTTPIP }}:{{ .HTTPPort }}/preseed.cfg ",
  "debian-installer=en_US auto locale=en_US kbd-chooser/method=us ",
  "hostname={{ .Name }} ",
  "fb=false debconf/frontend=noninteractive ",
  "keyboard-configuration/modelcode=SKIP keyboard-configuration/layout=USA keyboard-configuration/variant=USA console-setup/ask_detect=false ",
  "passwd/root-password=\"{{user `root_password`}}\" passwd/root-password-again=\"{{user `root_password`}}\" ",
  "initrd=/install/initrd.gz -- "
]
{% endhighlight %}

---
layout: post
title:  "Testing in Ember.js, Part 1"
date:   2015-04-24 11:15:00
categories: testing emberjs javascript heroku
originalURI: http://blogs.library.ucsf.edu/ckm/2015/04/24/testing-in-ember-js-part-1
---

## The Big Picture
The goal of automated testing is to find problems before your users do. Good tests do this by preventing bad code from being merged. A great continuous integration (CI) setup can catch problems in beta browsers and libraries in time to report them to their authors or fix your code before a release happens. By the end of this three part series you will have a great CI setup. Tests will automatically run against any browser you support and any future version of your dependencies.

Requirements for this guide are [Ember.js](http://emberjs.com/) > 1.10 and [Ember CLI](http://www.ember-cli.com/) > 0.2.3\. It may be entirely possible to do this without Ember CLI, but I wouldn't know how. In Part One, we will cover using Sauce Labs and Travis CI to create your test matrix.

## Getting Set Up

If you've never used Ember CLI before, you should follow [their instructions to install all dependencies](http://www.ember-cli.com/#getting-started). Now let's create a new sandbox to play in: 

```bash
$ ember new testing-sandbox
$ cd testing-sandbox $ ember test --server 
``` 

Congrats! You now have a brand new Ember.js app and running tests in both PhantomJS and Chrome. Go ahead and leave that console window open and create a new one. Tests will keep running in the original window and track all the changes we make. 

```bash
$ cd testing-sandbox
$ ember g acceptance-test welcome-page
```

Your test console should now record a failure indicating: 

```bash
✘ UnrecognizedURLError: /welcome-page
```

Open `testing-sandbox/tests/acceptance/welcome-page-test.js` in your favorite editor and make it look like this:

```javascript
import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'testing-sandbox/tests/helpers/start-app';

var application;

module('Acceptance: WelcomePage', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('we should be welcoming', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    var title = find('#title');
    assert.equal(title.text(), 'Welcome to Ember.js');
  });
});
```

Save that and all of your tests should pass. We are ready to get started with multi-browser testing.

## Test Multiple Browsers in the Cloud

[Sauce Labs](https://saucelabs.com) is a service for running your tests against a huge variety of browsers. We're going to abstract a lot of the complexity of using Sauce Labs by taking advantage of the excellent [ember-cli-sauce](https://github.com/johanneswuerbach/ember-cli-sauce) addon. First, you will need Sauce Labs credentials. You can [start a free trial](https://saucelabs.com/signup/trial) or, if your project is open source, you can sign up for [Open Sauce](https://saucelabs.com/opensauce/). When you are done, take note of your user name and access key. You will need them later. Let's install the addon: 

```bash
$ember install ember-cli-sauce
```

Now we can add additional browsers to our `testem.json` file. Testem calls these _launchers_: 

```bash
$ ember sauce --browser='firefox' --platform='Windows 7'
$ ember sauce --browser='internet explorer' --version=11 --platform='Windows 8.1'
```

 Lets run some tests! First we have to export our sauce credentials as environment variables.

```bash
$export SAUCE_USERNAME="YOUR_USERNAME"
$export SAUCE_ACCESS_KEY="YOUR_ACCESS_KEY"
```

 Then we fire up a proxy tunnel so Sauce Labs browsers can get to our local Ember.js server.
 ```bash
 $ember start-sauce-connect
 ```
 
 Then we launch the actual tests. 
 
 ```bash
$ember test --launch='SL_firefox_Windows_7,SL_internet_explorer_11_Windows_8_1'
```

 You should see something like: 
 
```bash
ok 1 Firefox 37.0 - Acceptance: WelcomePage: we should be welcoming
ok 2 Firefox 37.0 - JSHint - acceptance: acceptance/welcome-page-test.js should pass jshint
ok 3 Firefox 37.0 - JSHint - .: app.js should pass jshint
ok 4 Firefox 37.0 - JSHint - helpers: helpers/resolver.js should pass jshint
ok 5 Firefox 37.0 - JSHint - helpers: helpers/start-app.js should pass jshint
ok 6 Firefox 37.0 - JSHint - .: router.js should pass jshint
ok 7 Firefox 37.0 - JSHint - .: test-helper.js should pass jshint
ok 8 IE 11.0 - Acceptance: WelcomePage: we should be welcoming
ok 9 IE 11.0 - JSHint - acceptance: acceptance/welcome-page-test.js should pass jshint
ok 10 IE 11.0 - JSHint - .: app.js should pass jshint
ok 11 IE 11.0 - JSHint - helpers: helpers/resolver.js should pass jshint
ok 12 IE 11.0 - JSHint - helpers: helpers/start-app.js should pass jshint
ok 13 IE 11.0 - JSHint - .: router.js should pass jshint
ok 14 IE 11.0 - JSHint - .: test-helper.js should pass jshint

1..14
# tests 14
# pass  14
# fail  0

# ok
```

 
Wasn't that awesome? You just tested your code in two browsers. You can add anything you want to testem.json. Go nuts! When you are done testing remember to kill the tunnel we opened. 
 
```bash
$ember stop-sauce-connect
```

## Making It Automatic with Travis CI

The last piece of this puzzle is to use Travis CI to run these tests for you every time you commit code. Update your .travis.yml file to run Sauce Labs tests. You will need to tell Travis CI what your Sauce Labs credentials are in the `env` section: 


```yaml
---
language: node_js
node_js:
  - "0.12"

sudo: false

env:
  global:
    #set these here becuase they get pulled out by testem saucie
    - SAUCE_USERNAME="YOUR_USER_NAME"
    - SAUCE_ACCESS_KEY="YOUR_ACCESS_KEY"

cache:
  directories:
    - node_modules

before_install:
  - "npm config set spin false"
  - "npm install -g npm@^2"

install:
  - npm install -g bower
  - npm install
  - bower install

before_script:
  # Create a sauce tunnel
  - ember start-sauce-connect

script:
  - ember test --launch='SL_firefox_Windows_7,SL_internet_explorer_11_Windows_8_1' --port=8080

after_script:
  # Destroy the sauce tunnel
  - ember stop-sauce-connect
```

You are well on your way to being a cross-browser testing hero! In my next post I will take you through using the ember-try addon to test your code against upcoming Ember.js versions. If you have questions or see a mistake tweet [@iam_jrjohnson](https://twitter.com/iam_jrjohnson).

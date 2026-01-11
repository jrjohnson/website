---
layout: post
title: 'Testing in Ember.js, Part 2: ember-try and the Travis CI build matrix'
date: 2015-04-30 11:15:00
categories: testing emberjs javascript travisci
originalURI: http://blogs.library.ucsf.edu/ckm/2015/04/30/testing-in-emb…i-build-matrix
---

## Our Story So Far

The goal of automated testing is to find problems before your users do. Good tests do this by preventing bad code from being merged. A great continuous integration (CI) setup can catch problems in beta browsers and libraries in time to report them to their authors or fix your code before a release happens. By the end of this three part series you will have a great CI setup. Tests will automatically run against any browser you support and any future version of your dependencies. In [Part One](/testing/emberjs/javascript/heroku/2015/04/24/testing-emberjs-part1.html), we covered using Sauce Labs and Travis CI to create your test matrix.

In Part Two, we will start testing our application against multiple versions of Ember using the [excellent ember-try addon](https://www.npmjs.com/package/ember-try) and create a Travis CI build matrix which will allow some options to fail without the entire test failing. The goal of these two improvements to our original setup is to see issues coming long before they become problems.

## Getting Set Up

Part Two picks up [right where we left off](/testing/emberjs/javascript/heroku/2015/04/24/testing-emberjs-part1.html) with a working ember-cli project and build configuration. Let's install the ember-try addon.

```bash
$ cd testing-sandbox
$ ember install ember-try
```

[ember-try](https://www.npmjs.com/package/ember-try) is a completely configurable way to test your code against upcoming versions of Ember. You may want to customize this later, but for now let's add a file to `testing-sandbox/config/ember-try.js` with these contents:

```javascript
// jshint node: true
module.exports = {
  scenarios: [
    {
      name: 'our-current',
      dependencies: {},
    },
    {
      name: 'ember-release',
      dependencies: {
        ember: 'ember#release',
      },
      resolutions: {
        ember: 'release',
      },
    },
    {
      name: 'ember-beta',
      dependencies: {
        ember: 'ember#beta',
      },
      resolutions: {
        ember: 'beta',
      },
    },
    {
      name: 'ember-canary',
      dependencies: {
        ember: 'ember#canary',
      },
      resolutions: {
        ember: 'canary',
      },
    },
  ],
};
```

That creates a few different build targets. The first one, `our-current`, is whatever version of Ember your app currently depends on, by leaving the dependencies blank it will use your current setup. The others are dynamically linked to the Ember release process for latest release, beta, and canary. We can now run all of our tests against the beta version of Ember.js with a single command.

```bash
 $ember try ember-beta test
```

Go ahead, give that a spin, it's pretty great right? You can also test everything in your config file with the command:

```bash
 $ember try:testall
```

## Automating with Travis CI

In Part One, we learned how to test against any browser and now we know how to test against any version of Ember.js. The only thing missing is a way to automate the entire process. We're going to take advantage of [Travis CI's build matrix](http://docs.travis-ci.com/user/build-configuration/#The-Build-Matrix) to organize our tests into discrete units. We need to modify our Travis configuration to:

1.  Make a variable for the browser we are testing with
2.  Make a variable for the Ember.js version we are testing against
3.  Not start Sauce Connect unless we need it
4.  Combine all of this into a build matrix
5.  Allow some of these test combinations to fail

The new `.travis.yml` file looks like this:

```yaml
---
language: node_js
node_js:
  - '0.12'

sudo: false

env:
  global:
    # Setup SauceLabs Credentials
    - SAUCE_USERNAME="YOUR_USER_NAME"
    - SAUCE_ACCESS_KEY="YOUR_ACCESS_KEY"
    # Some default values for our build matrix
    - START_SAUCE_CONNECT=false
    - EMBER_VERSION='our-current'
    - TESTEM_LAUNCHER='PhantomJS'

matrix:
  fast_finish: true
  allow_failures:
    - env: EMBER_VERSION='ember-beta'
    - env: EMBER_VERSION='ember-canary'
    - env: "TESTEM_LAUNCHER='SL_internet_explorer_11_Windows_8_1' START_SAUCE_CONNECT=true"
  include:
    - env: "TESTEM_LAUNCHER='SL_firefox_Windows_7' START_SAUCE_CONNECT=true"
    - env: "TESTEM_LAUNCHER='SL_internet_explorer_11_Windows_8_1' START_SAUCE_CONNECT=true"
    - env: "EMBER_VERSION='ember-beta'"
    - env: "EMBER_VERSION='ember-canary'"

cache:
  directories:
    - node_modules

before_install:
  - 'npm config set spin false'
  - 'npm install -g npm@^2'

install:
  - npm install -g bower
  - npm install
  - bower install

before_script:
  # Create a sauce tunnel only if we need it
  - if [ "$START_SAUCE_CONNECT" = true ]; then ember start-sauce-connect; fi

script:
  # run our tests against the Ember version and browser of our choice
  - ember try ${EMBER_VERSION} test --port=8080 --launch=${TESTEM_LAUNCHER} --skip-cleanup

after_script:
  # Destroy the sauce tunnel if we needed it
  - if [ "$START_SAUCE_CONNECT" = true ]; then ember stop-sauce-connect; fi
```

That's it for Part Two! Tune in next week for a look at writing acceptance tests to take advantage of this setup. If you have questions or see a mistake, tweet [@jrjohnson\_](https://twitter.com/jrjohnson_).

Updated: 5/6/15 - Changed the ember-try config to use a blank set of dependancies. Thanks [@katiegengler](https://twitter.com/katiegengler) for the suggestion.

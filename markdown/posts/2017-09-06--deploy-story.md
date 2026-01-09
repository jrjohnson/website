---
layout: post
title: 'Deploying with Ember.js: a story'
date: 2017-09-06 02:01:00
categories: emberjs deploy
originalURI: https://blogs.library.ucsf.edu/ckm/2017/09/06/deploying-with-ember-js-a-story/
---

## What is this all about?

This is the story of how we changed our Ember.js application deployment one night while no one was looking. This is not
a strictly technical story, and the details may not matter; what is important is the journey we took and the steps
you can follow to get your app deploying however you want.

## Some Background (feel free to skip)

Our application - [Ilios](https://iliosproject.org) - is an installed solution and the code is in two parts. The API and
management code is written in PHP and is installed by medical schools all over the world. Each installation is a little
bit different, but they all require and consume our Ember.js frontend application. We don't ship the frontend with the
API codebase, it is provide separately and updated far more frequently. In the past we have shipped and `index.html` file
with links to our AWS Cloudfront distribution containing the assets. This way the assets are stored in a CDN where
they can be loaded quickly by users and easily kept up to date by our team without needing to understand each
individual installation.

## Our Goals (the whole point of this)

In order to take advantage of http/2 push and service workers we need to change the way the frontend is deployed. Our
goal is to ship a single archive file containing the frontend assets including the app code, service workers, images, styles
etc...

This archive must be tagged in such a way that we can have many versions in the wild at the same time with a
default active version. Because the code for our API does change it must be possible to activate versions in such a way
that v23 is the default frontend for API v1.1 and v34 is the default frontend for API v1.3.

Once the archive is downloaded and extracted by the API server it must be simple to parse and customize the files so that
scripts and styles can be sent to the browser using http/2 push `LINK` headers and service workers can be placed at the
root of our domain (where they must be do be effective).

Because we are constantly adding new features and fixing bugs we need to be able to release versions continuously.

### TLDR

We want to ship a magical box to our customers and we want to ship it all the time.

## Our Journey

### Starts with a plan on a whiteboard

#### Distribute

1. Build the app
2. Archive the build artifacts
3. Tag the archive with a version which combines both a unique ID for the code as well as the API version it works with
4. Upload the archive to an S3 bucket
5. Mark the most recent version so it is easy to find

#### Consume

1. Download and extract the archive at

- a) the most recent version
- b) a specific version from the past
- c) dev build we want to test

2. Parse the the index file to extract configuration and assets
3. Serve a modified `index.html` file to users

### Leads to [Ember-cli-deploy](http://ember-cli-deploy.com/)

This isn't a surprise `ember-cli-deploy` has both the builtin tools and a plugin ecosystem to make deploying Ember.js apps
very manageable. All we need to do is assemble a list of plugins that can meet our needs.
As is the case with many ember addons, our journey really starts with [Ember Observer](https://emberobserver.com/)
where we find there is a whole category dedicated to plugins for `ember-cli-deploy`.

Some investigation and perusal of the `deploy` docs and a few minutes in the `#ec-deploy` channel in the
[Ember Slack Team](https://embercommunity.slack.com) will lead us to some standard choices and well supported solutions.

- `ember-cli-deploy` is the foundation we can build on
- `ember-cli-deploy-build` builds our app
- `ember-cli-deploy-revision-data` can tag and activate versions
- `ember-cli-deploy-s3` uploads our assets and makes them public in an S3 bucket

A search for 'archive' in Ember Observer leads us to:

- `ember-cli-deploy-archive` which takes our build assets and outputs a single tar archive

These combined knock out several of our needs.

Further investigation of `ember-cli-deploy-s3` leads us to it's companion
`ember-cli-deploy-s3-index` which not only uploads to S3, it also manages versioning and activation.

And while looking around we also stumble upon `ember-cli-deploy-json-config` which conveniently parses our messy
`index.html` file and outputs nice human and machine readable `JSON` that will be _way easier_ for our API server to consume.

Looks like we don't have to write any code at all! Just install and configure some plugins just the way we
want and in the end just need to run a few instal commands:

```bash
ember install ember-cli-deploy
ember install ember-cli-deploy-archive
ember install ember-cli-deploy-build
ember install ember-cli-deploy-display-revisions
ember install ember-cli-deploy-json-config
ember install ember-cli-deploy-revision-data
ember install ember-cli-deploy-s3-index
```

Which helpfully creates a `config/deploy.js` file for us with some useful defaults:

```javascript
module.exports = function (deployTarget) {
  var ENV = {
    build: {},
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
```

We just need to configure our AWS info and we will something working. Note: I removed targets
here as well as comments for brevity.

```javascript
module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    's3-index': {
      accessKeyId: '<our-access-key>',
      secretAccessKey: '<our-secret>',
      bucket: '<our-bucket-name>',
      region: '<our-bucket-region>'
    },
  };

  return ENV;
};
```

Next step is to try it out:

```
ember deploy development  --verbose
...
...
Pipeline complete
```

And when we got look in our S3 bucket low and behold there is an build.tar:HASH file in there! We're really getting somewhere.

That version is nice, but remember we really need to know what API versions this build is compatible with. Oh, I see
there is a `prefix` option we can use.

```
's3-index': {
  ...
  prefix: 'v1.22'
},
```

Deploy again and we now have a bucket with

```
build.tar:HASH (from our first deploy)
v1.22/
  build.tar:NEWHASH (from our second deploy)
```

That is _exactly_ what the Doctor ordered. Check that off our list and lets download that archive and see what it has.
Hmmm... it has an `index.html` file, but no `index.json` file. Looking back
at the `--verbose` output we can see why

```
+- didBuild
|  |
|  +- archive
- saving tarball of tmp/deploy-dist to tmp/deploy-archive/build.tar
- tarball ok
|  |
|  +- json-config
- generating `tmp/deploy-dist/index.json` from `tmp/deploy-dist/index.html`
- generated: `tmp/deploy-dist/index.json`
- added `index.json` to `context.distFiles`
```

The `build.tar` file is getting generated before the `index.json` file has been created. Since both of these plugins are
doing their work inside the `didBuild` hook we just need to swap the order they run in. We can find out how to do that
in the docs at http://ember-cli-deploy.com/docs/v1.0.x/configuration/#advanced-plugin-configuration

Looks like we just add a `pipeline` object to our deploy config like:

```
pipeline: {
  runOrder: {
    'archive': { after: 'json-config' },
  },
},
```

and... done! running `ember deploy production` again gives us exactly the build.tar we're looking for.

## The End

Seriously. That's how the story ends. No brave journey into the darkness of code comments to figure out just how this
is supposed to work. It just works. TM. It's so simple we can just add it as a command at the end of our CI process
and never think about it again.

## Afterwords

I'm 100% head over heals in love with `ember-cli-deploy`. I find it incredibly freeing to be able to tinker with our
deployment process to find just the right setup without needing to design and script each pice every time. The plugin
ecosystem gives me the building blocks I can use to assemble our pipeline in whatever way makes sense so we can test new
ideas and strategies fast and with very little friction.

I hope this was a useful overview of one deployment journey. Want to share your own? Tell me about a mistake I made or
shower me with praise? Leave a comment here or find me at [@jrjohnson\_](https://twitter.com/jrjohnson_).

---
layout: post
title: 'Testing in Ember.js, Part 3: mock data with ember-cli-mirage'
description: >
  The goal of automated testing is to find problems before your users do. Good tests do this by preventing bad code from being merged. A great continuous integration (CI) setup can catch problems in beta browsers and libraries in time to report them to their authors or fix your code before a release happens. By the end of this three part series you will have a great CI setup. Tests will automatically run against any browser you support and any future version of your dependencies.
date: 2015-04-30 11:15:00
categories: testing emberjs javascript mirage
originalURI: http://blogs.library.ucsf.edu/ckm/2015/05/27/testing-in-emb…ber-cli-mirage
---

## When Last We Left Our Heroes...

The goal of automated testing is to find problems before your users do. Good tests do this by preventing bad code from being merged. A great continuous integration (CI) setup can catch problems in beta browsers and libraries in time to report them to their authors or fix your code before a release happens. By the end of this three part series you will have a great CI setup. Tests will automatically run against any browser you support and any future version of your dependencies. In [Part One](https://blogs.library.ucsf.edu/ckm/2015/04/24/testing-in-ember-js-part-1/), we covered using Sauce Labs and Travis CI to create your test matrix. In [Part Two](https://blogs.library.ucsf.edu/ckm/2015/04/30/testing-in-ember-js-part-2-ember-try-and-the-travis-ci-build-matrix/), we covered testing our application against many versions of Ember. In Part Three, we will write some acceptance tests and use the [awesome ember-cli-mirage addon](http://www.ember-cli-mirage.com/) to provide controlled mock data to our tests and development environment.

## Getting Set Up

Part Three picks up [right where we left off](https://blogs.library.ucsf.edu/ckm/2015/04/30/testing-in-ember-js-part-2-ember-try-and-the-travis-ci-build-matrix/) with a working ember-cli project and build configuration. This is _not_ a tutorial on [Test Driven Development](http://en.wikipedia.org/wiki/Test-driven_development) so we're going to start out with a working example and then test it. First setup our ember-data models:

```bash
$ cd testing-sandbox
$ ember g model fruit title:string color:belongsTo
$ cat app/models/fruit.js
import DS from 'ember-data';
export default DS.Model.extend({
  title: DS.attr('string'),
  color: DS.belongsTo('color', {async: true})
});

$ ember g model color title:string fruits:hasMany
$ cat app/models/color.js
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  fruits: DS.hasMany('fruit', {async: true})
});
```

Then a simple route:

```bash
 $ ember g route colors --path='/colors'
```

Modify `app/routes/colors.js` to get all the colors:

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('color');
  },
});
```

Setup a template to list the colors and their fruits `app/templates/colors.hbs`

```handlebars
<ul>
  {{#each model as |color|}}
    <li>{{color.title}}
      <ul>
        {{#each color.fruits as |fruit|}}
          <li>{{fruit.title}}</li>
        {{/each}}
      </ul>
    </li>
  {{/each}}
</ul>
```

## Setup ember-cli-mirage

Let's install the [ember-cli-mirage](http://www.ember-cli-mirage.com/) addon.

```bash
 $ ember install ember-cli-mirage
```

Now we need to configure our basic API routes. Mirage creates a basic configuration file for you at `app/mirage/config.js`. We just need to add a few lines for our new models:

```javascript
export default function () {
  this.get('/colors');
  this.get('/colors/:id');
  this.get('/fruits');
  this.get('/fruits/:id');
}
```

For each of our models we need a factory so our tests can create new data. As ember-cli-mirage matures, generators for your factories will be added. For now, you have to make them on your own. We need one for `fruit` and one for `color`.

Create the file `app/mirage/factories/fruit.js`:

```javascript
import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: (i) => `fruit ${i}`,
  color: null,
});
```

…and the file `app/mirage/factories/color.js`:

```javascript
import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: (i) => `color ${i}`,
  fruits: [],
});
```

Wow. Thats was some serious setup; take heart that we're done now and we can finally write a test.

## Finally a test!

```bash
  $ember g acceptance-test colors
```

Add some fixture data and a test to your new file at `tests/acceptance/colors-test.js`:

```javascript
test('visiting /colors', function (assert) {
  //turn on logging so we can see what mirage is doing
  server.logging = true;

  //make our first color, its gets an id of one
  server.create('color', {
    //fill this color with some fruits (they don't exist yet, thats next)
    fruits: [1, 2, 3, 4, 5],
  });
  //now lets create a bunch of fruits and link them to our color
  server.createList('fruit', 5, {
    color: 1,
  });
  //want another color? - just add it.
  server.create('color', {
    fruits: [6, 7],
  });
  server.createList('fruit', 2, {
    color: 2,
  });
  visit('/colors');

  andThen(function () {
    assert.equal(currentURL(), '/colors');
    //this is a stupid test, but hey its a tutorial, what did you expect?
    assert.equal(find('li').length, 9);
  });
});
```

Yup, I wrote that test for you. This isn't a lesson on Test Driven Development. If you want that [watch "Test Driven Development By Example"](https://www.youtube.com/watch?v=2b1vcg_XSR8). The important part here is that we create fresh testing data with every test using `server` from ember-cli-mirage. You can be in complete control of what is passed to your application so you can check for any condition.

## Final Thoughts

We're just about out of time and we covered a lot. You still have some test writing to do and I wish there was an addon to do that for you. Until then you can take solace in the knowledge that your testing infrastructure is a foundation you can build your reputation on. Until next time, Internet friends: If you liked it or hated it let me know [@jrjohnson\_](https://twitter.com/jrjohnson_).

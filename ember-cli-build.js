'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    sassOptions: {
      silenceDeprecations: ['mixed-decls'],
    },
  });
  app.import('node_modules/highlight.js/styles/a11y-dark.css');

  return require('@embroider/compat').compatBuild(app, Webpack, {
  staticAddonTestSupportTrees: true,
  staticAddonTrees: true,
  staticHelpers: true,
  staticModifiers: true,
  staticComponents: true,
  staticEmberSource: true,
  splitAtRoutes: [
    'posts',
    'posts.post',
    'posts.index',
    'talks',
    'talks.talk',
    'talks.index',
    'talks.slide-text',
    'resume',
    'projects',
  ],
  packagerOptions: {
     webpackConfig: { }
  }
  });
};

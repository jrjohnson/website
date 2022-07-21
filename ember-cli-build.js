'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [
          { module: require('postcss-import') },
          { module: require('postcss-custom-media') },
          { module: require('postcss-nesting') },
          { module: require('cssstats') },
          { module: require('postcss-stats-reporter') },
          { module: require('postcss-reporter') },
        ],
      },
      filter: {
        enabled: true,
        plugins: [{ module: require('autoprefixer') }],
      },
    },
  });

  app.import('node_modules/highlight.js/styles/a11y-dark.css');

  return app.toTree();
};

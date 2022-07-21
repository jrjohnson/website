'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'jrjohnson',
    environment,
    rootURL: '/',
    locationType: 'history',
    googleFonts: [
      'Crimson+Text:400,700',
      'Yantramanav:400,700'
    ],
    'ember-cli-markdown-resolver': {
      folders: {
        'posts': 'markdown/posts',
        'talks': 'markdown/talks',
        'slide-text': 'markdown/slide-text',
        'pages': 'markdown/pages',
      }
    },
    fontawesome: {
      icons: {
        'free-brands-svg-icons': [
          'github',
          'linkedin',
          'twitter',
        ],
        'pro-solid-svg-icons': [
          'blog',
          'keynote',
          'project-diagram',
          'scroll',
        ],
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};

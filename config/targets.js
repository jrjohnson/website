'use strict';

const browsers = [
  'last 1 Chrome versions',
  'last 1 Firefox versions',
  'last 1 Safari versions',
];

const isCI = !!process.env.CI;
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  browsers.push('last 1 edge versions');
  browsers.push('firefox esr');
  browsers.push('last 1 ios versions');
}

module.exports = {
  browsers,
};

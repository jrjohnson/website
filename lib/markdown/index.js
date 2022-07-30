'use strict';

const MarkdownResolver = require('broccoli-markdown-resolver');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForAddon() {
    let markdownFiles = new MarkdownResolver(['markdown'], {
      outputFile: 'files.js',
      trimExtensions: true,
    });

    return this._super.treeForAddon.call(this, markdownFiles);
  },
};

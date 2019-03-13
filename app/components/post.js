import Component from '@ember/component';
import hljs from 'highlight.js/lib/highlight';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.element.querySelectorAll('pre code').forEach(el => {
      hljs.highlightBlock(el);
    });
  }
});

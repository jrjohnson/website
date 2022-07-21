import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | post', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('markdown', '# Post \n - list 1\n - list 2');
    await render(hbs`<Post @post={{markdown}} />`);

    assert.dom('section').exists();
    assert.dom('section h1').containsText('Post');
    assert.dom('section ul').exists();
    assert.dom('section ul li').exists({ count: 2 });
    assert.dom('section ul li:nth-of-type(1)').containsText('list 1');
    assert.dom('section ul li:nth-of-type(2)').containsText('list 2');
  });
});

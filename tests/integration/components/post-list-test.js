import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | post-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('posts', [
      { path: 'test', attributes: { date: '2019-03-01', title: 'test-post' } },
    ]);
    await render(hbs`<PostList @posts={{posts}} />`);

    assert.dom('.post-list').exists();
    assert.dom('.post-list').containsText('[Friday, March 1, 2019]');
    assert.dom('.post-list').containsText('test-post');
  });
});

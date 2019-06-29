import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | talk-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('talks', [
      { path: 'test', attributes: { date: '2019-03-01', title: 'test-talk' } }
    ]);
    await render(hbs`<TalkList @talks={{talks}} />`);

    assert.dom('.talk-list').exists();
    assert.dom('.talk-list').containsText('[Friday, March 1, 2019]');
    assert.dom('.talk-list').containsText('test-talk');
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | date-format', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', '2005-06-24');

    await render(hbs`{{date-format inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Friday, June 24, 2005');
  });
});

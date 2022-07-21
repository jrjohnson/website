import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | single talk', function (hooks) {
  setupApplicationTest(hooks);

  test('single talk renders and is accessible', async function (assert) {
    await visit('/talks/2019-06-always-be-updating');
    assert.strictEqual(currentURL(), '/talks/2019-06-always-be-updating');
    assert.dom('section h2').containsText('Always Be Updating');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});

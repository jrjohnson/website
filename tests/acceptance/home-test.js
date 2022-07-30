import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | home', function (hooks) {
  setupApplicationTest(hooks);

  test('home is accessible', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});

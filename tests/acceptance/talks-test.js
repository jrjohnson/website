import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | talks', function (hooks) {
  setupApplicationTest(hooks);

  test('talks is accessible', async function (assert) {
    await visit('/talks');
    assert.equal(currentURL(), '/talks');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});

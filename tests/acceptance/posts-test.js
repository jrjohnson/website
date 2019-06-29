import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | posts', function(hooks) {
  setupApplicationTest(hooks);

  test('posts is accessible', async function(assert) {
    await visit('/posts');
    assert.equal(currentURL(), '/posts');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});

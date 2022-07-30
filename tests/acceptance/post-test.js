import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | single post', function (hooks) {
  setupApplicationTest(hooks);

  test('single renders and is accessible', async function (assert) {
    await visit('/posts/2019-05-26-ember-2019');
    assert.strictEqual(currentURL(), '/posts/2019-05-26-ember-2019');
    assert
      .dom('section h1')
      .containsText('From two directions: 2019 Ember.js Roadmap');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});

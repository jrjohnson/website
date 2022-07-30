import { module, test } from 'qunit';
import { setupTest } from 'jrjohnson/tests/helpers';

module('Unit | Service | MarkdownResolver', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:markdown-resolver');
    assert.ok(service);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | talk', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:talk');
    assert.ok(route);
  });
});

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  router: service(),
  isSplashPage: computed('router.currentURL', function () {
    return this.router.currentURL == '/';
  }),
});

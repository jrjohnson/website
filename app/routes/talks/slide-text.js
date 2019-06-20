import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  async model({ talk_id }) {
    return this.markdownResolver.file('slide-text', talk_id);
  }
});

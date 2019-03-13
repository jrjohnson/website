import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  async model({ talk_id }) {
    const id = talk_id.replace('.html', '');
    return this.markdownResolver.file('talks', id);
  }
});

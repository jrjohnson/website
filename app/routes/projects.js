import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  async model() {
    const page = await this.markdownResolver.file('pages', 'projects');

    return page.content;
  }
});

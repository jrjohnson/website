import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ResumeRoute extends Route {
  @service markdownResolver;

  async model() {
    const page = await this.markdownResolver.file('pages', 'resume');

    return page.content;
  }
}

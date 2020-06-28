import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProjectsRoute extends Route {
  @service markdownResolver;

  async model() {
    const page = await this.markdownResolver.file('pages', 'projects');

    return page.content;
  }
}

import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ResumeRoute extends Route {
  @service markdownResolver;
  model() {
    const page = this.markdownResolver.getFile('pages', 'resume');
    return page.content;
  }
}

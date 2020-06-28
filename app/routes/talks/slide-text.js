import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class SlideTextRoute extends Route {
  @service markdownResolver;

  async model({ talk_id }) {
    return this.markdownResolver.file('slide-text', talk_id);
  }
}

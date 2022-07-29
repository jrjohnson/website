import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class SlideTextRoute extends Route {
  @service markdownResolver;
  model({ talk_id }) {
    return this.markdownResolver.getFile('slide-text', talk_id);
  }
}

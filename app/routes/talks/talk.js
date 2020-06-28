import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class TalkRoute extends Route {
  @service markdownResolver;

  async model({ talk_id }) {
    const talk = await this.markdownResolver.file('talks', talk_id);

    return talk;
  }
}

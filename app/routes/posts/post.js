import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class PostRoute extends Route {
  @service markdownResolver;

  async model({ post_id }) {
    const post = await this.markdownResolver.file('posts', post_id);

    return post.content;
  }
}

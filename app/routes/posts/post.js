import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class PostRoute extends Route {
  @service markdownResolver;
  model({ post_id }) {
    const post = this.markdownResolver.getFile('posts', post_id);
    return post.content;
  }
}

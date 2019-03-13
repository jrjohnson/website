import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  async model({ post_id }) {
    const post = await this.markdownResolver.file('posts', post_id);

    return post.content;
  }
});

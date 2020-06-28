import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  @service markdownResolver;

  async model() {
    const tree = await this.markdownResolver.tree('posts');
    const improvedPaths = tree.files.map(({ path, attributes, content }) => {
      const cleanPath = path.replace('markdown/posts/', '');
      return { path: cleanPath, attributes, content };
    });

    return improvedPaths.sortBy('attributes.date').reverse();
  }
}

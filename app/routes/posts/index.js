import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  async model() {
    const tree = await this.markdownResolver.tree('posts');
    const improvedPaths = tree.files.map(({ path, attributes, content }) => {
      const cleanPath = path.replace('posts/', '');
      return { path: cleanPath, attributes, content };
    });

    return improvedPaths.sortBy('attributes.date').reverse();
  }
});

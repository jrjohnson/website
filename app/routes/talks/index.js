import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  async model() {
    const tree = await this.markdownResolver.tree('talks');
    const improvedPaths = tree.files.map(({ path, attributes, content }) => {
      const cleanPath = path.replace('markdown/talks/', '');
      return { path: cleanPath, attributes, content };
    });

    return improvedPaths.sortBy('attributes.date').reverse();
  }
});

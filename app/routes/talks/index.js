import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  @service markdownResolver;
  model() {
    const tree = this.markdownResolver.getTree('talks');
    const improvedPaths = tree.children.map(({ path, attributes, content }) => {
      const cleanPath = path.replace('markdown/talks/', '');
      return { path: cleanPath, attributes, content };
    });
    return improvedPaths
      .sort((a, b) => new Date(a.attributes.date) - new Date(b.attributes.date))
      .reverse();
  }
}

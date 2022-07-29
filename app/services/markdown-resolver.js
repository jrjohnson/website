import Service from '@ember/service';
import { trees } from 'markdown/files';

export default class MarkdownResolverService extends Service {
  getTree(name) {
    return trees.markdown.find((tree) => {
      return tree.path === `markdown/${name}`;
    });
  }

  getFile(dir, name) {
    const tree = this.getTree(dir);
    return tree.children.find((file) => {
      return file.path === `markdown/${dir}/${name}`;
    });
  }
}

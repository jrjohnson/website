import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async activate() {
    //remove our loading animation once the application is loaded
    document.getElementById('splash')?.classList.add('removing');
    setTimeout(() => document.getElementById('splash')?.remove(), 1000);
  }
}

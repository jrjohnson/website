import EmberRouter from '@ember/routing/router';
import config from 'jrjohnson/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('posts', function () {
    this.route('post', { path: '/:post_id' });
    this.route('index', { path: '/' });
  });
  this.route('talks', function () {
    this.route('talk', { path: '/:talk_id' });
    this.route('index', { path: '/' });
    this.route('slide-text', { path: '/slide-text/:talk_id' });
  });
  this.route('resume');
  this.route('projects');
});

import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('posts', function () {
    this.route('post', { path: '/:post_id' });
    this.route('index', { path: '/' });
  });
  this.route('talks', function () {
    this.route('talk', { path: '/:talk_id' });
    this.route('index', { path: '/' });
  });
  this.route('resume');
  this.route('projects');
});

export default Router;

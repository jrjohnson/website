import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service router;

  get isSplashPage() {
    return this.router.currentURL == '/';
  }
}

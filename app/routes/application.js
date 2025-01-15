import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service currentSession;
  @service router;

  async beforeModel(transition) {
    await this.session.setup();
    this.session.requireAuthentication(transition, 'login');

    if (this.session.isAuthenticated) {
      try {
        await this.currentSession.load();
      } catch (err) {
        await this.session.invalidate();
      }
    } else {
      this.router.transitionTo('login');
    }
  }
}

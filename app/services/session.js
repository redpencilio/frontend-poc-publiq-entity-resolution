import SessionService from 'ember-simple-auth/services/session';
import { inject as service } from '@ember/service';

export default class ExtendedSessionService extends SessionService {
  @service currentSession;
  @service router;

  async handleAuthentication() {
    try {
      await this.currentSession.load();
    } catch (error) {
      this.invalidate();
    }
    super.handleAuthentication('index');
  }

  async handleInvalidation() {
    await this.currentSession.clear();
    try {
      super.handleInvalidation(...arguments);
    } catch (error) {
      this.router.transitionTo('login');
    }
  }

  async invalidate() {
    await this.currentSession.clear();
    return super.invalidate(...arguments);
  }
}

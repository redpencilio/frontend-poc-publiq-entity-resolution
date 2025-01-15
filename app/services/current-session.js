import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked user;

  async load() {
    if (this.session.isAuthenticated) {
      const accountId =
        this.session.data.authenticated.data.relationships.account.data.id;
      if (accountId) {
        const account = await this.store.findRecord('account', accountId, {
          include: 'user',
        });
        this.user = await account.user;
      }
    }
  }

  clear() {
    this.user = null;
  }
}

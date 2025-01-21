import Route from '@ember/routing/route';
import { service } from '@ember/service';
import constants from '../../constants';

const { ENTITY_TYPES } = constants;

export default class MappingsNextRoute extends Route {
  @service store;
  @service router;

  async model() {
    const mapping = await this.store.queryOne('mapping', {
      sort: '-score',
      filter: {
        'subject-type': ENTITY_TYPES.LOCATION,
        'object-type': ENTITY_TYPES.LOCATION,
        ':has-no:predicate': true,
        ':has-no:has-derivation': true,
        ':has-no:derived-from': true,
      },
    });
    if (mapping) {
      this.router.transitionTo('mappings.mapping', mapping.id);
    } else {
      this.router.transitionTo('mappings.outstanding');
    }
  }
}

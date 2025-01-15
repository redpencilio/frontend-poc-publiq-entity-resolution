import Route from '@ember/routing/route';
import { service } from '@ember/service';
import constants from '../../constants';

const { ENTITY_TYPES } = constants;

export default class MappingsNextRoute extends Route {
  @service store;

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
      const [left, right] = await Promise.all([
        this.store.queryOne('location', {
          'filter[:uri:]': mapping.object,
          include: 'address',
        }),
        this.store.queryOne('location', {
          'filter[:uri:]': mapping.subject,
          include: 'address',
        }),
      ]);
      return { mapping, left, right };
    } else {
      return null;
    }
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.mappingComment = null;
  }
}

import Route from '@ember/routing/route';
import { service } from '@ember/service';
import constants from '../../../constants';

const { MAPPING_PREDICATES, ENTITY_TYPES, MAPPING_JUSTIFICATIONS } = constants;

export default class MappingsLocationAutoRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };

  async model(params) {
    const mappings = await this.store.query('mapping', {
      sort: params.sort,
      page: {
        size: params.size,
        number: params.page,
      },
      filter: {
        'subject-type': ENTITY_TYPES.LOCATION,
        'object-type': ENTITY_TYPES.LOCATION,
        predicate: MAPPING_PREDICATES.EXACT,
        ':has-no:has-derivation': true,
        justification: MAPPING_JUSTIFICATIONS.COMPOSITE,
      },
    });
    return mappings;
  }
}

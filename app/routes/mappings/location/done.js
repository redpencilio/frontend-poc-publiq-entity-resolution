import Route from '@ember/routing/route';
import { service } from '@ember/service';
import constants from '../../../constants';

const { ENTITY_TYPES, MAPPING_JUSTIFICATIONS } = constants;

export default class MappingsLocationDoneRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
    matchPredicate: { refreshModel: true },
  };

  async model(params) {
    const optionalFilters = {};
    if (params.matchPredicate) {
      optionalFilters[':exact:predicate'] = params.matchPredicate;
    }
    const mappings = await this.store.query('mapping', {
      sort: params.sort,
      page: {
        size: params.size,
        number: params.page,
      },
      filter: {
        'subject-type': ENTITY_TYPES.LOCATION,
        'object-type': ENTITY_TYPES.LOCATION,
        ':has:derived-from': true,
        justification: MAPPING_JUSTIFICATIONS.MANUAL,
        ...optionalFilters,
      },
      include: 'derived-from,creator',
    });
    return mappings;
  }
}

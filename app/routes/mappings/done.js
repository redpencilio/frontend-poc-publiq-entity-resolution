import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MappingsDoneRoute extends Route {
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
        ':has:derived-from': true,
        ...optionalFilters,
      },
      include: 'derived-from,creator',
    });
    return mappings;
  }
}

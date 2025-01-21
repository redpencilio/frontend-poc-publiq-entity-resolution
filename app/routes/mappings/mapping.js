import Route from '@ember/routing/route';
import { service } from '@ember/service';
import constants from '../../constants';

const { ENTITY_TYPES, MAPPING_JUSTIFICATIONS } = constants;

export default class MappingsMappingRoute extends Route {
  @service store;
  @service router;

  async model(params) {
    const mapping = await this.store.findRecord('mapping', params.mapping_id, {
      include: 'derived-from,has-derivation',
    });
    if (mapping) {
      const originalMapping = await mapping.derivedFrom;
      if (originalMapping) {
        this.router.transitionTo('mappings.mapping', originalMapping.id);
        return;
      } else {
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
      }
    } else {
      return null;
    }
  }

  async afterModel() {
    const [doneCount, totalCount] = await Promise.all([
      this.store.count('mapping', {
        filter: {
          'subject-type': ENTITY_TYPES.LOCATION,
          'object-type': ENTITY_TYPES.LOCATION,
          justification: MAPPING_JUSTIFICATIONS.COMPOSITE,
          ':has:has-derivation': true,
        },
      }),
      this.store.count('mapping', {
        filter: {
          'subject-type': ENTITY_TYPES.LOCATION,
          'object-type': ENTITY_TYPES.LOCATION,
          justification: MAPPING_JUSTIFICATIONS.COMPOSITE,
        },
      }),
    ]);
    this.doneCount = doneCount;
    this.totalCount = totalCount;
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.mappingComment = null;
    controller.progress = {
      value: this.doneCount,
      total: this.totalCount,
    };
  }
}

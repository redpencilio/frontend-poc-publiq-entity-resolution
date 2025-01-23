import Route from '@ember/routing/route';
import { service } from '@ember/service';

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
        const derivedMapping = await mapping.hasDerivation;
        return {
          mapping,
          left,
          right,
          hasMatchPredicate: mapping.predicate || derivedMapping?.predicate,
        };
      }
    } else {
      return null;
    }
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.mappingComment = null;
    controller.recalculateProgress();
  }
}

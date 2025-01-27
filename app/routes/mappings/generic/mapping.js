import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class MappingsGenericMappingRoute extends Route {
  @service store;
  @service router;

  async model(params) {
    const mapping = await this.store.findRecord('mapping', params.mapping_id, {
      include: 'derived-from,has-derivation',
    });
    if (mapping) {
      const originalMapping = await mapping.derivedFrom;
      if (originalMapping) {
        this.router.transitionTo(
          'mappings.generic.mapping',
          originalMapping.id,
        );
        return;
      } else {
        const derivedMapping = await mapping.hasDerivation;
        return {
          mapping,
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

  @action
  loading(transition) {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    const controller = this.controllerFor(this.routeName);
    controller.isLoadingModel = true;
    transition.promise.finally(() => {
      controller.isLoadingModel = false;
    });

    return false;
  }
}

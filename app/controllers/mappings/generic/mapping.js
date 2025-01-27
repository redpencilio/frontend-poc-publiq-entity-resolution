import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import constants from '../../../constants';

const { MAPPING_PREDICATES, MAPPING_JUSTIFICATIONS } = constants;

export default class MappingsGenericMappingController extends Controller {
  @service store;
  @service router;

  @tracked mappingComment;
  @tracked progress;
  @tracked isLoadingModel;

  get isSaving() {
    return (
      this.isLoadingModel ||
      this.confirmExactMatch.isRunning ||
      this.confirmRelatedMatch.isRunning ||
      this.declineMatch.isRunning
    );
  }

  @task
  *confirmExactMatch() {
    yield this.createManualMapping(MAPPING_PREDICATES.EXACT);
    yield this.goToNextMapping();
  }

  @task
  *confirmRelatedMatch() {
    yield this.createManualMapping(MAPPING_PREDICATES.RELATED);
    yield this.goToNextMapping();
  }

  @task
  *declineMatch() {
    yield this.createManualMapping(MAPPING_PREDICATES.NONE);
    yield this.goToNextMapping();
  }

  resetMatch = async () => {
    const manualMapping = await this.model.mapping.hasDerivation;
    await manualMapping.destroyRecord();
    this.router.refresh(this.router.currentRouteName);
  };

  async recalculateProgress() {
    const [doneCount, totalCount] = await Promise.all([
      this.store.count('mapping', {
        filter: {
          justification: MAPPING_JUSTIFICATIONS.COMPOSITE,
          ':has-no:predicate': true,
          ':has:has-derivation': true,
        },
      }),
      this.store.count('mapping', {
        filter: {
          justification: MAPPING_JUSTIFICATIONS.COMPOSITE,
          ':has-no:predicate': true,
        },
      }),
    ]);
    this.progress = {
      value: doneCount,
      total: totalCount,
    };
  }

  async createManualMapping(matchPredicate) {
    const {
      subjectLabel,
      objectLabel,
      subject,
      object,
      subjectType,
      objectType,
    } = this.model.mapping;
    const newMapping = this.store.createRecord('mapping', {
      subjectLabel,
      objectLabel,
      subject,
      object,
      subjectType,
      objectType,
      comment: this.mappingComment,
      justification: MAPPING_JUSTIFICATIONS.MANUAL,
      predicate: matchPredicate,
      derivedFrom: this.model.mapping,
    });
    await newMapping.save();
  }

  async goToNextMapping() {
    const mapping = await this.store.queryOne('mapping', {
      sort: '-score',
      filter: {
        ':has-no:predicate': true,
        ':has-no:has-derivation': true,
        ':has-no:derived-from': true,
      },
    });

    if (mapping) {
      this.router.transitionTo('mappings.generic.mapping', mapping.id);
    } else {
      this.router.transitionTo('mappings.generic.outstanding');
    }
  }
}

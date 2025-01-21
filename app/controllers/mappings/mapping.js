import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import constants from '../../constants';

const { MAPPING_PREDICATES, MAPPING_JUSTIFICATIONS } = constants;

export default class MappingsMappingController extends Controller {
  @service store;
  @service router;

  @tracked mappingComment;

  confirmExactMatch = async () => {
    await this.createManualMapping(MAPPING_PREDICATES.EXACT);
    this.router.transitionTo('mappings.next');
  };

  confirmRelatedMatch = async () => {
    await this.createManualMapping(MAPPING_PREDICATES.RELATED);
    this.router.transitionTo('mappings.next');
  };

  declineMatch = async () => {
    await this.createManualMapping(MAPPING_PREDICATES.NONE);
    this.router.transitionTo('mappings.next');
  };

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
}

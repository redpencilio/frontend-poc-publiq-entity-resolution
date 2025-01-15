import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import constants from '../../constants';

const { MAPPING_PREDICATES, MAPPING_JUSTIFICATIONS } = constants;

export default class MappingsNextController extends Controller {
  @service store;
  @service router;

  @tracked mappingComment;

  confirmExactMatch = async () => {
    await this.createManualMapping(MAPPING_PREDICATES.EXACT);
    this.router.refresh(this.router.currentRouteName);
  };

  confirmRelatedMatch = async () => {
    await this.createManualMapping(MAPPING_PREDICATES.RELATED);
    this.router.refresh(this.router.currentRouteName);
  };

  declineMatch = async () => {
    await this.createManualMapping(MAPPING_PREDICATES.NONE);
    this.router.refresh(this.router.currentRouteName);
  };

  async createManualMapping(matchPredicate) {
    const { subjectLabel, objectLabel, subject, object } = this.model.mapping;
    const newMapping = this.store.createRecord('mapping', {
      subjectLabel,
      objectLabel,
      subject,
      object,
      comment: this.mappingComment,
      justification: MAPPING_JUSTIFICATIONS.MANUAL,
      predicate: matchPredicate,
      derivedFrom: this.model.mapping,
    });
    await newMapping.save();
  }
}

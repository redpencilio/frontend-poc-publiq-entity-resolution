import Controller from '@ember/controller';
import { service } from '@ember/service';
import constants from '../../constants';

const { MAPPING_PREDICATES } = constants;

export default class MappingsNextController extends Controller {
  @service store;
  @service router;

  get leftAddress() {
    return this.model?.type == 'location'
      ? this.model.left.address
      : this.model.left;
  }

  get rightAddress() {
    return this.model?.type == 'location'
      ? this.model.right.address
      : this.model.right;
  }

  get mapping() {
    return this.model?.mapping;
  }

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
    const { justification, subjectLabel, objectLabel, subject, object } =
      this.model.mapping;
    const newMapping = this.store.createRecord('mapping', {
      justification,
      subjectLabel,
      objectLabel,
      subject,
      object,
      predicate: matchPredicate,
      derivedFrom: this.model.mapping,
    });
    await newMapping.save();
  }
}

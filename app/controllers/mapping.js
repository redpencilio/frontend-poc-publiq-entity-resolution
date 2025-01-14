import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class MappingController extends Controller {
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
    await this.createManualMapping(
      'http://www.w3.org/2004/02/skos/core#exactMatch',
    );
    this.router.refresh(this.router.currentRouteName);
  };

  confirmRelatedMatch = async () => {
    await this.createManualMapping(
      'http://www.w3.org/2004/02/skos/core#relatedMatch',
    );
    this.router.refresh(this.router.currentRouteName);
  };

  declineMatch = async () => {
    // todo: this is not a real skos predicate!
    await this.createManualMapping(
      'http://www.w3.org/2004/02/skos/core#noMatch',
    );
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

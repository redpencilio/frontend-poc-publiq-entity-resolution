import Controller from '@ember/controller';
import { isPresent } from '@ember/utils';
import { service } from '@ember/service';

export default class MappingController extends Controller {
  @service store;
  @service router;

  get isLocation() {
    return isPresent(this.model?.locationA);
  }
  get isAddress() {
    return isPresent(this.model?.addressA);
  }

  get mapping() {
    return this.model?.mapping;
  }

  accept = async () => {
    await this.createDuplicateMapping(
      'http://www.w3.org/2004/02/skos/core#exactMatch',
    );
    this.router.refresh(this.router.currentRouteName);
  };

  decline = async () => {
    // todo: this is not a real skos predicate!
    await this.createDuplicateMapping(
      'http://www.w3.org/2004/02/skos/core#noMatch',
    );
    this.router.refresh(this.router.currentRouteName);
  };

  async createDuplicateMapping(predicateType) {
    const newMapping = this.store.createRecord('mapping', {
      justification: this.mapping.justification,
      subjectLabel: this.mapping.subjectLabel,
      objectLabel: this.mapping.objectLabel,
      subject: this.mapping.subject,
      object: this.mapping.object,
      predicate: predicateType,
      derivedFrom: this.mapping,
    });
    await newMapping.save();
  }
}

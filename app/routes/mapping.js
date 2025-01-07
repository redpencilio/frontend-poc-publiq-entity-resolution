import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MappingRoute extends Route {
  @service store;

  async model() {
    const mapping = await this.store.queryOne('mapping', {
      filter: {
        ':has-no:predicate': true,
        ':has-no:has-derivation': true,
        ':has-no:derived-from': true,
      },
    });
    if (mapping) {
      const object = mapping.object;
      const subject = mapping.subject;
      const addressA = await this.store.findRecordByUri('address', object);
      if (addressA) {
        // is a mapping for addresses
        const addressB = await this.store.findRecordByUri('address', subject);
        return { mapping, addressA, addressB };
      } else {
        // is a mapping of locations
        const locationA = await this.store.findRecordByUri('location', object);
        const locationB = await this.store.findRecordByUri('location', subject);
        return { mapping, locationA, locationB };
      }
    } else {
      return null;
    }
  }
}

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
      const left = await this.store.findRecordByUri('address', object);
      if (left) {
        // is a mapping for addresses
        const right = await this.store.findRecordByUri('address', subject);
        return { mapping, type: 'address', left, right };
      } else {
        // is a mapping of locations
        const left = await this.store.findRecordByUri('location', object);
        const right = await this.store.findRecordByUri('location', subject);
        return { mapping, type: 'location', left, right };
      }
    } else {
      return null;
    }
  }
}

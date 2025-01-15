import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class LocationSublineComponent extends Component {
  @service store;

  @tracked location;

  constructor() {
    super(...arguments);
    this.loadRecord();
  }

  async loadRecord() {
    this.location = await this.store.queryOne('location', {
      'filter[:uri:]': this.args.uri,
      include: 'address',
    });
  }
}

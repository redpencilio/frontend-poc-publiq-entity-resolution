import Route from '@ember/routing/route';
import { service } from '@ember/service';
import constants from '../../constants';

const { ENTITY_TYPES } = constants;

export default class MappingsNextRoute extends Route {
  @service store;
  @service router;

  async model() {
  }
}

import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MappingsDoneController extends Controller {
  @service router;

  @tracked page = 0;
  @tracked size = 50;
  @tracked sort = '-derived-from.score';
  @tracked matchPredicate;

  @action
  setMatchPredicate(value) {
    this.matchPredicate = value;
    this.page = 0;
  }

  @action
  navigateToMapping(mapping) {
    this.router.transitionTo('mappings.mapping', mapping.id);
  }

  @action
  previousPage() {
    this.selectPage(this.page - 1);
  }

  @action
  nextPage() {
    this.selectPage(this.page + 1);
  }

  @action
  selectPage(page) {
    this.page = page;
  }
}

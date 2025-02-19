import EmberRouter from '@ember/routing/router';
import config from 'frontend-poc-publiq-entity-resolution/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('sparql');
  this.route('mappings', function () {
    this.route('generic', { path: '' }, function () {
      this.route('proposed');
      this.route('mapping', { path: '/:mapping_id' });
      this.route('done');
      this.route('auto');
    });
    this.route('location', function () {
      this.route('proposed');
      this.route('mapping', { path: '/:mapping_id' });
      this.route('done');
      this.route('auto');
    });
  });
});

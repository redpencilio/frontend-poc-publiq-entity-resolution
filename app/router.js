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
    this.route('proposed');
    this.route('next');
    this.route('mapping', { path: '/:mapping_id' });
    this.route('done');
  });
});

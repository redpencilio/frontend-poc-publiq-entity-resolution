import Model, { attr, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') uri;
  @attr('string') name;

  @hasMany('account', { inverse: 'user', async: true }) accounts;
  @hasMany('mapping', { async: true, inverse: 'creator' }) mappings;
}

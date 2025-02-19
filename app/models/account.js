import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('string') uri;
  @attr('string') accountName;
  @attr('string') accountServiceHomepage;
  @belongsTo('person', { inverse: 'account', async: true }) user;
}

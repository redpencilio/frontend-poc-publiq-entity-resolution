import Model, { attr, belongsTo } from '@ember-data/model';

export default class AddressModel extends Model {
  @attr('string') uri;
  @attr('date') created;
  @attr('date') modified;
  @attr('language-string') address;
  @attr('string') postcode;
  @attr('language-string') city;
  @attr('language-string') street;
  @attr('string') number;
  @attr('string') country;
  @attr('string') poBox;

  @belongsTo('location', { async: true, inverse: 'address' }) location;
}

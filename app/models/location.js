import Model, { attr, belongsTo } from '@ember-data/model';

export default class LocationModel extends Model {
  @attr('string') uri;
  @attr('date') created;
  @attr('date') modified;
  @attr('string') label; // "publiek" or "verborgen" concept. Needs a rename.
  @attr('date') processed;
  @attr('string') identifier; // uri
  @attr('string') name;
  @attr('date') invalidated;
  @attr('date') availableFrom;
  @attr('string') workflowStatus; // uri

  @belongsTo('address', { async: true, inverse: 'location' }) address;
  //@belongsTo('geometry', { async: true, inverse: 'location' }) geometry;
}

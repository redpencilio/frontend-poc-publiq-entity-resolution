import Model, { attr } from '@ember-data/model';

export default class MappingModel extends Model {
  @attr('string') uri;
  @attr('date') created;
  @attr('date') modified;
  @attr('string') justification; // uri
  @attr('string') subjectLabel;
  @attr('string') objectLabel;
  @attr('number') score;
  // uri to either a location or address
  @attr('string') subject;
  @attr('string') object;
  @attr('string') predicate; // uri (like "http://www.w3.org/2004/02/skos/core#exactMatch")
}

import Model, { attr, belongsTo } from '@ember-data/model';
import { service } from '@ember/service';

export default class MappingModel extends Model {
  @service currentSession;

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
  @attr('string') subjectType;
  @attr('string') objectType;
  @attr('string') predicate; // uri (like "http://www.w3.org/2004/02/skos/core#exactMatch")
  @attr('string') comment;

  @belongsTo('person', { async: true, inverse: 'mappings' }) creator;
  @belongsTo('mapping', { async: true, inverse: 'derivedFrom' }) hasDerivation;
  @belongsTo('mapping', { async: true, inverse: 'hasDerivation' }) derivedFrom;

  save(options) {
    if (!this.isDeleted) {
      const now = new Date();
      this.modified = now;
      if (this.isNew) {
        this.created = now;
        this.creator = this.currentSession.user;
      }
    }
    return super.save(options);
  }
}

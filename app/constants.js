export default {
  ENTITY_TYPES: {
    LOCATION: 'http://purl.org/dc/terms/Location',
  },
  MAPPING_PREDICATES: {
    EXACT: 'http://www.w3.org/2004/02/skos/core#exactMatch',
    RELATED: 'http://www.w3.org/2004/02/skos/core#relatedMatch',
    // todo: this is not a real skos predicate!
    NONE: 'http://mu.semte.ch/vocabularies/ext/noMatch',
  },
  MAPPING_JUSTIFICATIONS: {
    MANUAL: 'https://w3id.org/semapv/vocab/ManualMappingCuration',
    COMPOSITE: 'https://w3id.org/semapv/vocab/CompositeMatching',
  },
};

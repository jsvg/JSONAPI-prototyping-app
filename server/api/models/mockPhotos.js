var buildRoute = require('../abstractRouteConstructor');
require('./mockAuthors');
require('./mockTags');

var schema = {
  modelName: 'mockPhotos',
  nRecords: 10,
  attributes: {
    label: {
      type: 'string',
      faker: 'company.bsNoun'
    },
    url: {
      type: 'string',
      faker: 'image.image'
    }
  },
  relationships: {
    'mockAuthor': {
      targetModel: 'mockAuthors',
      relation: 'one'
    },
    'mockTags': {
      targetModel: 'mockTags',
      relation: 'many',
      nMin: 1,
      nMax: 3
    }
  }
};

buildRoute(schema);

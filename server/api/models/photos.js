var buildRoute = require('../abstractRouteConstructor');
require('./authors');
require('./tags');

var schema = {
  modelName: 'photos',
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
    author: {
      targetModel: 'authors',
      relation: 'one'
    },
    tags: {
      targetModel: 'tags',
      relation: 'many',
      nMin: 1,
      nMax: 6
    }
  }
};

buildRoute(schema);

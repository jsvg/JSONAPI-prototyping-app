var buildRoute = require('../abstractRouteConstructor');
require('./articles');
require('./authors');

var schema = {
  modelName: 'comments',
  nRecords: 100,
  attributes: {
    body: {
      type: 'string',
      faker: 'lorem.sentence'
    }
  },
  relationships: {
    author: {
      targetModel: 'authors',
      relation: 'one'
    },
    article: {
      targetModel: 'articles',
      relation: 'one'
    }
  }
};

buildRoute(schema);

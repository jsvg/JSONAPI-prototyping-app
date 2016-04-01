var buildRoute = require('../abstractRouteConstructor');
require('./mockArticles');
require('./mockAuthors');

var schema = {
  modelName: 'mockComments',
  nRecords: 100,
  attributes: {
    body: {
      type: 'string',
      faker: 'lorem.sentence'
    }
  },
  relationships: {
    'mockAuthor': {
      targetModel: 'mockAuthors',
      relation: 'one'
    },
    'mockArticle': {
      targetModel: 'mockArticles',
      relation: 'one'
    }
  }
};

buildRoute(schema);

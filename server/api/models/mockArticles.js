var buildRoute = require('../abstractRouteConstructor');
require('./mockAuthors');
require('./mockTags');

var schema = {
  modelName: 'mockArticles',
  nRecords: 5,
  attributes: {
    title: {
      type: 'string',
      faker: 'lorem.sentence'
    },
    body: {
      type: 'string',
      faker: 'lorem.paragraph'
    }
  },
  relationships: {
    'mockAuthor': {
      targetModel: 'mockAuthors',
      relation: 'one'
    },
    'mockComments': {
      targetModel: 'mockComments',
      relation: 'belongsToMany',
      as: 'mockArticle'
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

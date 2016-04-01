var buildRoute = require('../abstractRouteConstructor');
require('./authors');
require('./tags');

var schema = {
  modelName: 'articles',
  nRecords: 15,
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
    author: {
      targetModel: 'authors',
      relation: 'one'
    },
    comments: {
      targetModel: 'comments',
      relation: 'belongsToMany',
      as: 'article'
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

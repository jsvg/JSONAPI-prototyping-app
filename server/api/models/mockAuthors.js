var buildRoute = require('../abstractRouteConstructor');

var schema = {
  modelName: 'mockAuthors',
  nRecords: 2,
  attributes: {
    firstName: {
      type: 'string',
      faker: 'name.firstName'
    },
    lastName: {
      type: 'string',
      faker: 'name.lastName'
    },
    email: {
      type: 'string',
      faker: 'internet.email'
    }
  },
  relationships: {
    'mockArticles': {
      targetModel: 'mockArticles',
      relation: 'belongsToMany',
      as: 'mockAuthor'
    },
    'mockPhotos': {
      targetModel: 'mockPhotos',
      relation: 'belongsToMany',
      as: 'mockAuthor'
    },
    'mockComments': {
      targetModel: 'mockComments',
      relation: 'belongsToMany',
      as: 'mockAuthor'
    }
  }
};

buildRoute(schema);

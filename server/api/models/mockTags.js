var buildRoute = require('../abstractRouteConstructor');

var schema = {
  modelName: 'mockTags',
  nRecords: 15,
  attributes: {
    tagName: {
      type: 'string',
      faker: 'company.bsAdjective'
    }
  },
  relationships: {
    mockPhotos: {
      targetModel: 'mockPhotos',
      relation: 'belongsToMany'
    },
    mockArticles: {
      targetModel: 'mockArticles',
      relation: 'belongsToMany'
    }
  }
};

buildRoute(schema);

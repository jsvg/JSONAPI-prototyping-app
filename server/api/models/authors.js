var schema = {
  modelName: 'authors',
  nRecords: 10,
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
    articles: {
      targetModel: 'articles',
      relation: 'belongsToMany',
      as: 'author'
    },
    photos: {
      targetModel: 'photos',
      relation: 'belongsToMany',
      as: 'author'
    },
    comments: {
      targetModel: 'comments',
      relation: 'belongsToMany',
      as: 'author'
    }
  }
};

module.exports = schema;
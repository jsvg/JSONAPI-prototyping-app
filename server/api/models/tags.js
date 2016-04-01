var schema = {
  modelName: 'tags',
  nRecords: 15,
  attributes: {
    tagName: {
      type: 'string',
      faker: 'company.bsAdjective'
    }
  },
  relationships: {
    photos: {
      targetModel: 'photos',
      relation: 'belongsToMany'
    },
    articles: {
      targetModel: 'articles',
      relation: 'belongsToMany'
    }
  }
};

module.exports = schema;
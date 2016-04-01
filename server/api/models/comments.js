var schema = {
  modelName: 'comments',
  nRecords: 3000,
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

module.exports = schema;
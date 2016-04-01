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
    },
    impact: {
      type: 'number',
      faker: 'random.number'
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

module.exports = schema;
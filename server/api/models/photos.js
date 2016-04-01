var schema = {
  modelName: 'photos',
  nRecords: 1000,
  attributes: {
    label: {
      type: 'string',
      faker: 'company.bsNoun'
    },
    url: {
      type: 'string',
      faker: 'image.image'
    }
  },
  relationships: {
    author: {
      targetModel: 'authors',
      relation: 'one'
    },
    tags: {
      targetModel: 'tags',
      relation: 'many',
      nMin: 1,
      nMax: 5
    }
  }
};

module.exports = schema;
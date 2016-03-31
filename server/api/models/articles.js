var model = require('path').basename(__filename).slice(0, -3);
var jsonApi = require('jsonapi-server');
var mixins = require('../mixins');
require('./authors');

var refs = {
  model: 'author',
  ids: mixins.ids.authors
};

var props = {
  body: {
    type: 'string',
    faker: 'company.bs'
  },
  author: {
    type: 'object',
    properties: {
      id: { $ref: 'author' },
      type: { pattern: 'author' }
    },
    required: ['id', 'type']
  }
};

var attrs = {
  body: jsonApi.Joi.string(),
  author: jsonApi.Joi.one('author')
};

var data = mixins.generateData(20, model, props, refs);
mixins.genJsonApiSchema(model, attrs, data);

var model = require('path').basename(__filename).slice(0, -3);
var jsonApi = require('jsonapi-server');
var authorIds = require('./authors.js');
var mixins = require('../mixins');

var refs = [{
  id: 'authorSchema',
  type: 'string',
  chance: { randInArray: [authorIds] }
}];

var props = {
  body: {
    type: 'string',
    faker: 'name.firstName'
  },
  author: {
    type: 'object',
    properties: {
      id: { $ref: 'authorSchema' },
      type: { pattern: 'author' }
    },
    required: ['id', 'type']
  }
};

var attrs = {
  body: jsonApi.Joi.string(),
  author: jsonApi.Joi.one('author')
};

var data = mixins.generateData(2, model, props, refs);
mixins.genJsonApiSchema(model, attrs, data);
module.exports = mixins.extractIds(data);

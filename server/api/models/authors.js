var model = require('path').basename(__filename).slice(0, -3);
var jsonApi = require('jsonapi-server');
var mixins = require('../mixins');

var props = {
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
};

var attrs = {
    firstName: jsonApi.Joi.string(),
    lastName: jsonApi.Joi.string(),
    email: jsonApi.Joi.string(),
    articles: jsonApi.Joi.belongsToMany({
      resource: 'articles',
      as: 'author'
    })
};

var data = mixins.generateData(3, model, props);
mixins.genJsonApiSchema(model, attrs, data);

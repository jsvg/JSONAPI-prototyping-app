var jsonApi = require("jsonapi-server");
var jsf = require('json-schema-faker');
var abstractHandler = require("../handlers/abstractHandler.js");
var model = require("path").basename(__filename).slice(0, -3);

var schema = {
  type: "array",
  minItems: 2,
  maxItems: 2,
  items: {
    type: "object",
    properties: {
      id: {
        type: "string",
        faker: "random.uuid"
      },
      type: {
        pattern: model
      },
      firstName: {
        type: "string",
        faker: "name.firstName"
      },
      lastName: {
        type: "string",
        faker: "name.lastName"
      },
      email: {
        type: "string",
        faker: "internet.email"
      }
    },
    required: ["id", "type", "firstName", "lastName", "email"]
  }
};

var data = jsf(schema);

jsonApi.define({
  namespace: "json:api",
  resource: model,
  handlers: abstractHandler,
  searchParams: { },
  attributes: {
    firstName: jsonApi.Joi.string().alphanum(),
    lastName: jsonApi.Joi.string().alphanum(),
    email: jsonApi.Joi.string().email(),
    articles: jsonApi.Joi.belongsToMany({
      resource: "articles",
      as: "author"
    }),
  },
  examples: data
});

var dataIds = data.map(function(i) { return i.id; });
module.exports = dataIds;

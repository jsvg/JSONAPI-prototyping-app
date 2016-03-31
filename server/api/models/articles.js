var jsonApi = require("jsonapi-server");
var jsf = require('json-schema-faker');
var abstractHandler = require("../handlers/abstractHandler.js");
var model = require("path").basename(__filename).slice(0, -3);
var authorIds = require('./authors.js');

var schema = {
  type: "array",
  minItems: 5,
  maxItems: 5,
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
      body: {
        type: "string",
        faker: "name.firstName"
      },
      author: {
        type: "object",
        properties: {
          id: { $ref: 'authorSchema' },
          type: { pattern: "author" }
        },
        required: ["id", "type"]
      }
    },
    required: ["id", "type", "body", "author"]
  }
};

var refs = [{
  id: "authorSchema",
  type: "string",
  chance: { randInArray: [authorIds] }
}];

var data = jsf(schema, refs);

jsonApi.define({
  namespace: "json:api",
  resource: model,
  handlers: abstractHandler,
  searchParams: { },
  attributes: {
    body: jsonApi.Joi.string(),
    author: jsonApi.Joi.one("author")
  },
  examples: data
});

var dataIds = data.map(function(i) { return i.id; });
module.exports = dataIds;

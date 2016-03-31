var jsonApi = require('jsonapi-server');
var jsf = require('json-schema-faker');
var path = require('path');

// extend chance with function to randomly select an item in an array
jsf.extend('chance', function(chance){
  chance.mixin({
    randInArray: function(arr) {
      randInt = Math.ceil(Math.random() * arr.length - 1);
      return arr[randInt];
    }
  });
  return chance;
});

/* functions for generating schemas */
function genModelData(n, model, props, refs) {
  // set defaults
  n = n || 10;
  model = model || "model";

  // construct "required" keys for item properties
  var keys = ['id', 'type'];
  for ( var k in props ) {
    keys.push(k);
  }

  // set base schema object
  var base = {
    type: 'array',
    minItems: n,
    maxItems: n,
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          faker: 'random.uuid'
        },
        type: {
          pattern: model
        }
      },
      required: keys
    }
  };

  // expand base object with properties
  for (var attr in props) {
    base.items.properties[attr] = props[attr];
  }

  // check for refs
  var data = refs ? jsf(base, refs) : jsf(base);
  return data;
}

function genJsonApiSchema(model, attrs, data, namespace) {
  namespace = namespace || 'json:api';
  var base = {
    namespace: namespace,
    resource: model,
    handlers: new jsonApi.MemoryHandler(),
    searchParams: { },
    attributes: attrs,
    examples: data
  };
  return jsonApi.define(base);
}

function extractIds(data) {
  return data.map(function(i) { return i.id; });
}

module.exports = {
  generateData: genModelData,
  genJsonApiSchema: genJsonApiSchema,
  extractIds: extractIds
};

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

/*********************************
 * mixins for generating schemas *
 *********************************/
// collect randomly generated IDs of models for use in relationship mapping
var idStore = {};

// consume schemas to create n number of jsf json data for "examples" in jsonApi
function genModelData(n, model, props, refs) {
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

  // handling for relationships
  if ( refs ) {
    refsSchema = [{
      id: refs.model,
      type: refs.type ? refs.type : 'string',
      chance: { randInArray: [refs.ids] }
    }];
  }

  var data = refs ? jsf(base, refsSchema) : jsf(base);
  idStore[model] = data.map(function(i) { return i.id; });
  return data;
}

// serialize generated json data
function genJsonApiSchema(model, attrs, data, namespace, idStore) {
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

module.exports = {
  generateData: genModelData,
  genJsonApiSchema: genJsonApiSchema,
  ids: idStore
};

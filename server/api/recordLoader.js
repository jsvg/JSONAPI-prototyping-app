var jsf = require('json-schema-faker');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');

var idStore = {};
idStore.forCreation = {};

function generateIds(schema) {
  var args = _.chain(schema)
    .pick(['modelName','nRecords'])
    .values()
    .value();

  var baseSchema = {
    'type': 'object',
    'properties': {
      'model': { 'type': 'string', 'pattern': args[0] },
      'ids': {
        type: 'array',
        minItems: args[1],
        maxItems: args[1],
        items: {
          'type': 'string',
          'faker': 'random.uuid'
        }
      }
    },
    'required': ['model', 'ids']
  };

  var data = jsf(baseSchema);
  // these ids are accessed in relationships and not touched
  idStore[data.model] = data.ids;
  // these ids are used to load the model, and are popped off when used
  // therefore should be empty after initialization
  idStore.forCreation[data.model] = data.ids;
}

fs.readdirSync(path.join(__dirname, '/models'))
  .map((filename) => {
    var tmp = require(path.join(__dirname, '/models/', filename));
    generateIds(tmp);
  });

module.exports = idStore;

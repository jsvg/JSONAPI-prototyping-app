var jsonApi = require('jsonapi-server');
var jsf = require('json-schema-faker');
var mixins = require('./mixins');
var _ = require('lodash');

var _idStore = {};



function _buildRouteSchema(schema) {
  var routeSchema = {};
  routeSchema.namespace = schema.namespace || 'json:api';
  routeSchema.resource = schema.modelName;
  routeSchema.handlers = schema.handlers || new jsonApi.MemoryHandler();
  routeSchema.searchParams = schema.searchParams || { };
  routeSchema.attributes = { };
  routeSchema.examples = { };
  // roll in attributes from schema.attributes and schema.relationships (if)
  _.map(schema.attributes, (v, k) => {
    routeSchema.attributes[k] = mixins.getValidator(v.type);
  });
  if ( schema.relationships ) {
    _.map(schema.relationships, (v, k) => {
      routeSchema.attributes[k] = mixins.getValidator(v.relation, v.targetModel || k, v.as || schema.modelName);
    });
  }
  return routeSchema;
}



function _buildRelationshipSchema(schema) {
  var rels = [];
  for (var rel in schema.relationships) {
    var model = schema.relationships[rel].targetModel || rel;
    var o = {};
    o.id = model;
    o.type = 'string';
    o.chance = {};

    if (schema.relationships[rel].relation === 'one') {
      o.chance.randInArray = [_idStore[model]];
    } else if (schema.relationships[rel].relation === 'many') {
      o.chance.randInArrayMany = [_idStore[model], model];
    }

    rels.push(o);
  }
  return rels;
}



function _buildDataSchema(schema) {
  var base = {};
  base.type = 'array';
  base.minItems = schema.nRecords || 10;
  base.maxItems = schema.nRecords || 10;
  base.items = {};
  base.items.type = 'object';
  base.items.properties = {};
  base.items.properties.id = {};
  base.items.properties.type = {};
  base.items.properties.id = { type: 'string', faker: 'random.uuid' };
  base.items.properties.type = { pattern: schema.modelName };
  base.items.required = _.chain(schema)
    .omit(['modelName','nRecords'])
    .map((o) => { return _.keys(o); })
    .concat(['id','type'])
    .flatten()
    .value();

  // expand items.properties to include all entities
  for (var propA in schema.attributes) {
    base.items.properties[propA] = schema.attributes[propA];
  }

  // expand items.props with relationships
  if ( schema.relationships ) {
    for (var propB in schema.relationships) {
      // relationship case "one"
      if ( schema.relationships[propB].relation === 'one' ) {
        base.items.properties[propB] = {
          type: 'object',
          properties: {
            id: { $ref: schema.relationships[propB].targetModel },
            type: { pattern: schema.relationships[propB].targetModel }
          },
          required: ['id', 'type']
        };
      // relationship case "many"
      } else if ( schema.relationships[propB].relation === 'many' ) {
        min = schema.relationships[propB].nMin || Math.ceil(_idStore[schema.relationships[propB].targetModel].length * 0.1);
        max = schema.relationships[propB].nMax || Math.ceil(_idStore[schema.relationships[propB].targetModel].length * 0.5);
        base.items.properties[propB] = {
          type: 'array',
          items: { $ref: schema.relationships[propB].targetModel },
          minItems: min,
          maxItems: max,
          uniqueItems: true
        };
      }
    }
  }

  return base;
}



function _decomposeSchema(schema) {
  var modelName = schema.modelName;
  var relationships = _buildRelationshipSchema(schema);
  var dataSchema = _buildDataSchema(schema);
  var routeSchema = _buildRouteSchema(schema);

  return {
    modelName: modelName,
    dataSchema: dataSchema,
    routeSchema: routeSchema,
    relationships: relationships
  };
}



function buildRoute(schema, verbose) {
  if (verbose===1) { console.log('==========================='); }
  if (verbose===1) { console.log('Generating:', schema.modelName); }
  
  if (verbose===2) { console.log('Decomposing schema...'); }
  var decomposition = _decomposeSchema(schema);
  if (verbose===2) { console.log('Decomponosition success'); }
  if (verbose===3) { console.log(decomposition); }
  if (verbose===4) { console.log('----------------------'); }
  
  if (verbose===2) { console.log('Generating schema data...'); }
  var data = jsf(decomposition.dataSchema, decomposition.relationships);
  rt = decomposition.routeSchema;
  rt.examples = data;
  _idStore[decomposition.modelName] = data.map(function(i) { return i.id; }); // model IDs to idStore
  if (verbose===2) { console.log('Generated n records:', data.length); }
  if (verbose===4) { console.log(data[0].mockTags); }

  if (verbose===2) { console.log('Loading route...'); }
  jsonApi.define(rt);
  if (verbose===2) { console.log('Route created'); }
}

module.exports = buildRoute;

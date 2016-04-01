var jsonApi = require('jsonapi-server');
var jsf = require('json-schema-faker');
var path = require('path');
var _ = require('lodash');


// extend chance with function to randomly select an item in an array
jsf.extend('chance', function(chance) {
  chance.mixin({
    randInArray: function(ids) {
      randInt = Math.ceil(Math.random() * ids.length - 1);
      return ids[randInt];
    }
  });
  return chance;
});

jsf.extend('chance', function(chance) {
  chance.mixin({
    randInArrayMany: function(ids, model) {
      randInt = Math.ceil(Math.random() * ids.length - 1);
      o = {};
      o.type = model;
      o.id = ids[randInt];
      return o;
    }
  });
  return chance;
});

jsf.extend('chance', function(chance) {
  chance.mixin({
    popId: function(ids, model) {
      return ids.forCreation[model].pop();
    }
  });
  return chance;
});

function getValidator(type, model, as) {
  model = model || 'none';
  as = as || 'none';
  return {
    // statics
    string: jsonApi.Joi.string(),
    number: jsonApi.Joi.number(),
    date: jsonApi.Joi.date(),
    any: jsonApi.Joi.any(),
    // relations
    one: jsonApi.Joi.one(model),
    many: jsonApi.Joi.many(model),
    belongsToOne: jsonApi.Joi.belongsToOne({resource: model, as: as}),
    belongsToMany: jsonApi.Joi.belongsToMany({resource: model, as: as}),
  }[type];
}

module.exports = {
  getValidator: getValidator
};

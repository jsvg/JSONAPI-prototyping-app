## Basics
WIP Application for rapid prototyping with the [JSON API Spec](jsonapi.org) and [Ember.js](emberjs.com).

## Objective
To create an JSON API compliant REST server that can be
used to easily generate data based on user-defined [JSON Schemas](json-schema.org/). API should support advanced functionality including
pagination, filtering, compound document generation, sparse
field-sets, and relationsip mapping. API should seamlessly
integrate with Ember.js and [Ember Data](https://github.com/emberjs/data
).

## Progress
Working: Defined schemas integrate with ember, including relationships,
and advanced features.
Not Working: Need to abstract and generalize schema defining.

## Specs
[JSONAPI-Server](https://github.com/holidayextras/jsonapi-server):
* Node.js (server)
* Express (framework)
* [Joi](https://github.com/hapijs/joi/blob/v8.0.5/API.md) (validation)
* [JSON Schema Faker](https://github.com/json-schema-faker/json-schema-faker) (generating synthetic data)

[Client](emberjs.com):
* Ember.js

## Loading
1. $ git clone this dir
2. $ cd client && npm install && bower install && ember s
3. $ cd server && npm install && npm start

## Debugging
$ DEBUG=jsonApi:* node api/server.js 

'use strict';
var server = module.exports = { };
var jsonApi = require('jsonapi-server');
var fs = require('fs');
var path = require('path');

jsonApi.setConfig({
  swagger: {
    title: 'Mock API',
    version: '0.0.0',
    description: 'API for Mock Database',
    contact: {
      name: 'Julian van Giessen',
      email: 'julian.vangiessen@gmail.com'
    },
    license: { name: 'WTFPL' }
  },
  protocol: 'http',
  hostname: 'localhost',
  port: 7331,
  base: 'api',
  meta: {
    description: 'Rapid Prototyping API'
  }
});

jsonApi.authenticate((request, callback) => {
  if (request.headers.blockme) return callback('Fail');
  if (request.cookies.blockMe) return callback('Fail');
  return callback();
});

jsonApi.onUncaughtException((request, error) => {
  var errorDetails = error.stack.split('\n');
  console.error(JSON.stringify({
    request: request,
    error: errorDetails.shift(),
    stack: errorDetails
  }));
});

var buildRoute = require('./abstractRouteConstructor');
fs.readdirSync(path.join(__dirname, '/models'))
  .map((filename) => { return require(path.join(__dirname, '/models/', filename)); })
  .map(buildRoute);

jsonApi.start();
server.start = jsonApi.start;
server.close = jsonApi.close;

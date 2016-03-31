var jsf = require('json-schema-faker');

jsf.extend('chance', function(chance){
  chance.mixin({
    randInArray: function(arr) {
      randInt = Math.ceil(Math.random() * arr.length - 1);
      return arr[randInt];
    }
  });
  return chance;
});
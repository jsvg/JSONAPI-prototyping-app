import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;
export default Model.extend({
  'label': attr('string'),
  'url': attr('string'),
  'author': belongsTo('author'),
  'tags': hasMany('tag')
});

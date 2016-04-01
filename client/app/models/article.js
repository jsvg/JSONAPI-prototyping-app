import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;
export default Model.extend({
  'title': attr('string'),
  'body': attr('string'),
  'author': belongsTo('author'),
  'comments': hasMany('comment'),
  'tags': hasMany('tag')
});

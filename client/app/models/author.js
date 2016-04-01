import DS from 'ember-data';
const { Model, attr, hasMany } = DS;
export default Model.extend({
  'firstName': attr('string'),
  'lastName': attr('string'),
  'email': attr('string'),
  'articles': hasMany('article'),
  'comments': hasMany('comment'),
  'photos': hasMany('photo')
});

import DS from 'ember-data';
const { Model, attr, hasMany } = DS;
export default Model.extend({
  'tagName': attr('string'),
  'photos': hasMany('photo'),
  'articles': hasMany('article')
});

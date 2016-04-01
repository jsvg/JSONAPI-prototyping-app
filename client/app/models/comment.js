import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;
export default Model.extend({
  'body': attr('string'),
  'author': belongsTo('author'),
  'article': belongsTo('article')
});

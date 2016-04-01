import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;
export default Model.extend({
  'label': attr('string'),
  'url': attr('string'),
  'photographer': belongsTo('author')
});

import DS from 'ember-data';
import config from 'client/config/environment';
const { JSONAPIAdapter } = DS;
export default JSONAPIAdapter.extend({
  host: config.APIhost,
  namespace: config.APInamespace
});

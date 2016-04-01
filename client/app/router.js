import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('photos');
  this.route('articles');
  this.route('tags');
});

export default Router;

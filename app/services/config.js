import Ember from 'ember';
import Collection from '../models/collection';

/**
@module app
@submodule models
*/

/**
 The CMS configuration

 @class Config
 @extends Ember.Object
 */

export default Ember.Service.extend({
  isServiceFactory: true,
  /*
    Instantiate all the collections
  */
  init: function() {
    var collection;
    var collections = [];
    for (var i=0, len = this.collections && this.collections.length; i<len; i++) {
      collection = Collection.create(this.collections[i]);
      collection.set("config", this);
      collections.push(collection);
    }
    this.collections = collections;
  },

  ready: false,

  container: null,

  /**
    The default formatter

    @property formatter
  */
  formatter: function() {
    return this.get("container").lookup("format:" + this.get("format"));
  }.property("config.format"),

  /**
    Find the collection matching the `id`

    @method findCollection
    @param {String} id
    @return {Collection} collection
  */
  findCollection: function(id) {
    return this.collections.filter(function(c) { return c.id === id; })[0];
  }
});

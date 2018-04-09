'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarkStore = {

  store: new JsonStore('./models/bookmark-store.json', { bookmarkCollection: [] }),
  collection: 'bookmarkCollection',

  getAllBookmarks() {
    return this.store.findAll(this.collection);
  },

  getBookmark(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addBookmark(bookmark) {
    this.store.add(this.collection, bookmark);
  },

  removeBookmark(id) {
    const bookmark = this.getBookmark(id);
    this.store.remove(this.collection, bookmark);
  },

  removeAllBookmarks() {
    this.store.removeAll(this.collection);
  },

  addResource(id, resource) {
    const bookmark = this.getBookmark(id);
    bookmark.resources.push(resource);
  },

  removeResource(id, bookmarkId) {
    const bookmark = this.getBookmark(id);
    const resources = bookmark.resources;
    _.remove(resources, { id: bookmarkId});
  },
  
};

module.exports = bookmarkStore;
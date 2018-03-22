'use strict';

const _ = require('lodash');

const bookmarkStore = {

  bookmarkCollection: require('./bookmark-store.json').bookmarkCollection,

  getAllBookmarks() {
    return this.bookmarkCollection;
  },
  
  getBookmark(id) {
    return _.find(this.bookmarkCollection, { id: id });
  },
  
     removeResource(id, resourceId) {
    const bookmark = this.getBookmark(id);
    _.remove(bookmark.resources, { id: resourceId });
  },
  
  removeBookmark(id) {
  _.remove(this.bookmarkCollection, { id: id });
},
}

module.exports = bookmarkStore;
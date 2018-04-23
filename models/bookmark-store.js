'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');
const uuid = require('uuid');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

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

  addResource(id, resource, response) {
    const bookmark = this.getBookmark(id);
    resource.picture.mv('tempimage', err => {
      if (!err) {
        cloudinary.uploader.upload('tempimage', result => {
          console.log(result);
          const bookmarkRes = {
            id: uuid(),
            picture: result.url,
            title: resource.title,
            link: resource.link
          };
          bookmark.resources.push(bookmarkRes);
          response();
        });
      }
    });
  },

  removeResource(id, bookmarkId) {
    const bookmark = this.getBookmark(id);
    const resources = bookmark.resources;
    _.remove(resources, { id: bookmarkId});
  },
  
  getUserBookmarks(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
};

module.exports = bookmarkStore;
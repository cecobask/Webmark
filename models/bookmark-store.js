'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const path = require('path');
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

  

  deletePicture(userId, image) {
    const id = path.parse(image);
    let album = this.getAlbum(userId);
    _.remove(album.photos, { img: image });
    cloudinary.api.delete_resources([id.name], function (result) {
      console.log(result);
    });
  },

  deleteAllPictures(userId) {
    let album = this.getAlbum(userId);
    if (album) {
      album.photos.forEach(photo => {
        const id = path.parse(photo.img);
        cloudinary.api.delete_resources([id.name], result => {
          console.log(result);
        });
      });
      this.store.remove(this.collection, album);
    }
  },
  
};

module.exports = bookmarkStore;
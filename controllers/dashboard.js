'use strict';

const logger = require('../utils/logger');
const bookmarkCollection = require('../models/bookmark-store.js');
const bookmarkStore = require('../models/bookmark-store');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Webmark Dashboard',
      bookmarks: bookmarkStore.getAllBookmarks(),
    };
    logger.info('about to render', bookmarkStore.getAllBookmarks());
    response.render('dashboard', viewData);
  },
  
  addBookmark(request, response) {
    const newBookmark = {
      id: uuid(),
      title: request.body.title,
      resources: [],
    };
    bookmarkStore.addBookmark(newBookmark);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;

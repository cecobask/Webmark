'use strict';

const logger = require('../utils/logger');
const bookmarkCollection = require('../models/bookmark-store.js');
const bookmarkStore = require('../models/bookmark-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Webmark Dashboard',
      bookmarks: bookmarkStore.getUserBookmarks(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
    };
    logger.info('about to render', bookmarkStore.getAllBookmarks());
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  addBookmark(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newBookmark = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      resources: [],
    };
    logger.debug('Creating a new Bookmark', newBookmark);
    bookmarkStore.addBookmark(newBookmark);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;

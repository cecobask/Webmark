'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const bookmarkStore = require('../models/bookmark-store');

const start = {
  index(request, response) {
    logger.info('start rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const userBookmarks = bookmarkStore.getUserBookmarks(loggedInUser.id);
      let totalBookmarkResources = 0;
      for(let x = 0; x < userBookmarks.length; x++){
        totalBookmarkResources += userBookmarks[x].resources.length;
      }
      
      const viewData = {
        title: 'Welcome to Webmark',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        bookmarks: bookmarkStore.getUserBookmarks(loggedInUser.id),
        totalBookmarkResources: totalBookmarkResources
      };
      response.render('start', viewData);
    }
    else response.redirect('/');
  }
  
};

module.exports = start;

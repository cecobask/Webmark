'use strict';

const logger = require('../utils/logger');
const bookmarkCollection = require('../models/bookmark-store.js');
const bookmarkStore = require('../models/bookmark-store');

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
};

module.exports = dashboard;

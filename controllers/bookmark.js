'use strict';

const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const bookmark = {
  index(request, response) {
    const bookmarkId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Bookmark id = ', bookmarkId);
    if (loggedInUser) {
    const viewData = {
      title: 'Bookmark',
      bookmark: bookmarkStore.getBookmark(bookmarkId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('bookmark', viewData);
    }
    else response.redirect('/');
  },
  
  deleteResource(request, response) {
    const bookmarkId = request.params.id;
    const resourceId = request.params.resourceid;
    logger.debug(`Deleting Resource ${resourceId} from Bookmark ${bookmarkId}`);
    bookmarkStore.removeResource(bookmarkId, resourceId);
    response.redirect('/bookmark/' + bookmarkId);
  },
  
  deleteBookmark(request, response) {
  const bookmarkId = request.params.id;
    bookmarkStore.removeBookmark(bookmarkId);
    response.redirect('/dashboard/');
  },
  
  addResource(request, response) {
    const bookmarkId = request.params.id;
    const bookmark = bookmarkStore.getBookmark(bookmarkId);
    const newResource = {
      id: uuid(),
      title: request.body.title,
      link: request.body.link,
    };
    bookmarkStore.addResource(bookmarkId, newResource);
    response.redirect('/bookmark/' + bookmarkId);
  },
};

module.exports = bookmark;
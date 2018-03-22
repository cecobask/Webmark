'use strict';

const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store');

const bookmark = {
  index(request, response) {
    const bookmarkId = request.params.id;
    logger.debug('Bookmark id = ', bookmarkId);
    const viewData = {
      title: 'Bookmark',
      bookmark: bookmarkStore.getBookmark(bookmarkId),
    };
    response.render('bookmark', viewData);
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
}
};

module.exports = bookmark;
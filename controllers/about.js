'use strict';

const commentStore = require('../models/comment-store.js');
const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const uuid = require('uuid');

const about = {
  index(request, response) {
    logger.info('about rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'About Webmark',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comments: commentStore.getAllComments(),
    };
    response.render('about', viewData);
    }
    else response.redirect('/');
  },
  
  addComment(request,response) {
    const newComment = {
      id: uuid(),
      name:request.body.name,
      comment:request.body.comment,
      time: new Date(),
    };
    commentStore.addComment(newComment);
    response.redirect('/about');
  },
  
  deleteComment(request, response) {
  const commentId = request.params.id;
    commentStore.removeComment(commentId);
    response.redirect('/about/');
  },

  
};

module.exports = about;

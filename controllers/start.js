'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');

const start = {
  index(request, response) {
    logger.info('start rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Welcome to Webmark',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('start', viewData);
    }
    else response.redirect('/');
  }
  
};

module.exports = start;

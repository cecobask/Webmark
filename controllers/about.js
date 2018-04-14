'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');

const about = {
  index(request, response) {
    logger.info('about rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'About Webmark',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('about', viewData);
    }
    else response.redirect('/');
  }
  
};

module.exports = about;

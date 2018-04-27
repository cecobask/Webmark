'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const bookmarkStore = require('../models/bookmark-store');
const userStore = require('../models/user-store');

const start = {
  index(request, response) {
    logger.info('start rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      let userBookmarks = bookmarkStore.getUserBookmarks(loggedInUser.id);
      let totalUserBookmarkResources = 0;
      let biggestUserCollectionName = "";
      let smallestUserCollectionName = "";
      let biggestUserCollectionSize = 0;
      let smallestUserCollectionSize = 100;
      let bookmarks = bookmarkStore.getAllBookmarks();
      let curBookmarks = undefined;
      let mostBookmarksUser = "";
      let leastBookmarksUser = "";
      let mostBookmarks = 0;
      let leastBookmarks = 100;
      let users = userStore.getAllUsers();
      let totalBookmarkResources = 0;
      var usersData = [];
      
      for(let x = 0; x < userBookmarks.length; x++) {
        totalUserBookmarkResources += userBookmarks[x].resources.length;
        if(userBookmarks[x].resources.length >= biggestUserCollectionSize) {
          biggestUserCollectionSize = userBookmarks[x].resources.length;
          biggestUserCollectionName = userBookmarks[x].title;
        }
        if(userBookmarks[x].resources.length <= smallestUserCollectionSize) {
          smallestUserCollectionSize = userBookmarks[x].resources.length;
          smallestUserCollectionName = userBookmarks[x].title;
        }
      }
      
      
      for(let y = 0; y < users.length; y++) {
        curBookmarks = bookmarkStore.getUserBookmarks(users[y].id);
        for(let e = 0; e < curBookmarks.length; e++) {
          totalBookmarkResources += curBookmarks[e].resources.length;
          // let data = {
          //   name: userStore.getUserById(curBookmarks[e].userid).firstName + " " + userStore.getUserById(curBookmarks[e].userid).lastName,
          //   collections: curBookmarks.length,
          //   bookmarks: curBookmarks[e].resources.length
          // }
          // usersData.push(data);
          if(curBookmarks[e].resources.length >= mostBookmarks) {
            mostBookmarks = curBookmarks[e].resources.length;
            mostBookmarksUser = userStore.getUserById(curBookmarks[e].userid);
            mostBookmarksUser = mostBookmarksUser.firstName + " " + mostBookmarksUser.lastName;
          } 
          if(curBookmarks[e].resources.length <= leastBookmarks) {
            leastBookmarks = curBookmarks[e].resources.length;
            leastBookmarksUser = userStore.getUserById(curBookmarks[e].userid);
            leastBookmarksUser = leastBookmarksUser.firstName + " " + leastBookmarksUser.lastName;
          }
        }
      }
      
      
      const viewData = {
        title: 'Welcome to Webmark',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        userBookmarks: bookmarkStore.getUserBookmarks(loggedInUser.id),
        totalUserBookmarkResources: totalUserBookmarkResources,
        averageNoUserBookmarks: Math.round(totalUserBookmarkResources/userBookmarks.length),
        biggestUserCollectionName: biggestUserCollectionName,
        smallestUserCollectionName: smallestUserCollectionName,
        bookmarks: bookmarks,
        totalBookmarkResources: totalBookmarkResources,
        averageNoBookmarks: Math.round(totalBookmarkResources/bookmarks.length),
        mostBookmarksUser: mostBookmarksUser,
        leastBookmarksUser: leastBookmarksUser,
        // usersData: usersData
      };
      response.render('start', viewData);
    }
    else response.redirect('/');
  }
  
};

module.exports = start;

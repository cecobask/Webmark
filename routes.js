'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const bookmark = require('./controllers/bookmark.js');
const accounts = require ('./controllers/accounts.js');

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/bookmark/:id', bookmark.index);
router.get('/bookmark/:id/deleteresource/:resourceid', bookmark.deleteResource);
router.get('/bookmark/deletebookmark/:id', bookmark.deleteBookmark);

router.post('/bookmark/:id/addresource', bookmark.addResource);
router.post('/dashboard/addbookmark', dashboard.addBookmark);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/addcomment', about.addComment);
router.get('/deletecomment/:id', about.deleteComment);

module.exports = router;

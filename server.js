'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);

const listener = app.listen(process.env.PORT, function () {
  logger.info(`glitch-playlist1 started on port ${listener.address().port}`);
});

'use strict';

if ('production' === process.env.NODE_ENV)
    require('newrelic');

var express         = require('express');
var configurator    = require('./config/configurator');
var db              = require('./config/dbase');
var routes          = require('./routes/routes');
var os              = require('os');
var port            = process.env.PORT || 3333;
var app             = express();
var server          = app.listen(port);
var socket          = require('./socket/socket');
var io              = require('socket.io').listen(server);

configurator.me(app, express, __dirname);
db.init();
routes.init(app);
socket.init(io);

console.log('up and running @: %s on port: %s', os.hostname(), port);
console.log('enviroment: %s', process.env.NODE_ENV);
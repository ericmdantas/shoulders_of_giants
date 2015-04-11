'use strict';

if ('production' === process.env.NODE_ENV)
    require('newrelic');

import express from 'express';
const app = express();
const port = process.env.PORT || 3333;

import RouteConfigurator from './config/configurator';
import SocketEvents from './socket/socket';
import DBaseConfig from './config/dbase';
import Routes from './routes/index';
import os from 'os';
const server          = app.listen(port);
var io              = require('socket.io').listen(server);

RouteConfigurator.init(app, express, __dirname);
DBaseConfig.init();
Routes.init(app, express.Router());
SocketEvents.init(io);

console.log(`up and running @: ${os.hostname()} on port: ${port}`);
console.log(`enviroment: ${process.env.NODE_ENV}`);
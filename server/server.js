'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

var _RouteConfigurator = require('./config/configurator');

var _RouteConfigurator2 = _interopRequireWildcard(_RouteConfigurator);

var _SocketEvents = require('./socket/socket');

var _SocketEvents2 = _interopRequireWildcard(_SocketEvents);

var _DBaseConfig = require('./config/dbase');

var _DBaseConfig2 = _interopRequireWildcard(_DBaseConfig);

var _Routes = require('./routes/index');

var _Routes2 = _interopRequireWildcard(_Routes);

var _os = require('os');

var _os2 = _interopRequireWildcard(_os);

if ('production' === process.env.NODE_ENV) require('newrelic');

var app = _express2['default']();
var port = process.env.PORT || 3333;

var server = app.listen(port);
var io = require('socket.io').listen(server);

_RouteConfigurator2['default'].init(app, _express2['default']);
_DBaseConfig2['default'].init();
_Routes2['default'].init(app, _express2['default'].Router());
_SocketEvents2['default'].init(io);

console.log('up and running @: ' + _os2['default'].hostname() + ' on port: ' + port);
console.log('enviroment: ' + process.env.NODE_ENV);
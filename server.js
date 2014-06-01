"use strict";

require('newrelic');

var express         = require('express'),
    configurator    = require('./config/configurator'),
    db              = require('./config/dbase'),
    routes          = require('./routes/routes'),
    os              = require('os'),
    port            = process.env.PORT || 3333,
    app             = express();

configurator.me(app, express, __dirname);
db.init();
routes.init(app);
app.listen(port);

console.log('up and running @: %s on port: %s', os.hostname(), port);
console.log('enviroment: %s', process.env.NODE_ENV);
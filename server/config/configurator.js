"use strict";

var morgan = require('morgan');
var bodyParser = require('body-parser');
var contentLength = require('express-content-length-validator');

var _me = function(application, exp, dir)
{
    application.use(exp.static(dir + '/client/dist/'));
    application.use(bodyParser());
    application.use(morgan('dev'));
    application.use(contentLength.validateMax({max: 666}));
}

exports.me = _me;
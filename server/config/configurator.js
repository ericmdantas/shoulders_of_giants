"use strict";

var morgan = require('morgan');
var bodyParser = require('body-parser');

var _me = function(application, exp, dir)
{
    application.use(exp.static(dir + '/client/dist/'));
    application.use(bodyParser());
    application.use(morgan('dev'));
}

exports.me = _me;
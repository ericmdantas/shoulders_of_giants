"use strict";

import morgan from 'morgan';
import bodyParser from 'body-parser';
import contentLength from 'express-content-length-validator';

export default class RouteConfigurator
{
    static init(application, exp, dir)
    {
        var _root = process.cwd();

        application.use(exp.static(_root + '/client/dist/'));
        application.use(bodyParser());
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 666}));
    }
}
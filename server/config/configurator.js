"use strict";

import morgan from 'morgan';
import bodyParser from 'body-parser';
import contentLength from 'express-content-length-validator';

export default class RouteConfigurator
{
    static init(application, exp, dir)
    {
        application.use(exp.static(dir + '/client/dist/'));
        application.use(bodyParser());
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 666}));
    }
}
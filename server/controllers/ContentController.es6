"use strict";

var fs = require('fs');

export default class StaticController
{
    static sendIndex(req, res)
    {
        var _root = process.cwd();

        res.setHeader('Content-Type', 'text/html');

        fs.createReadStream(_root + '/client/dist/index.html')
          .pipe(res);
    }
}
"use strict";

var fs = require('fs');

export default class StaticController
{
    static sendIndex(req, res)
    {
        res.setHeader('Content-Type', 'text/html');

        fs.createReadStream('dist/index.html')
          .pipe(res);
    }
}
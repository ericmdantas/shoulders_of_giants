"use strict";

var fs = require('fs');

export default class StaticController
{
    static sendIndex(req, res)
    {
        var _root = process.cwd();

        res.setHeader('Content-Type', 'text/html');

        var _folder = process.env !== 'production' ? '__tmp' : 'dist';

        fs.createReadStream(_root + `/client/${_folder}/index.html`)
          .pipe(res);
    }
}
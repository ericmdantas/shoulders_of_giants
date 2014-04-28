"use strict";

var fs = require('fs');

function ContentController()
{
    this.index = function(req, res)
    {
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('views/index.html', function(err, obj)
                                        {
                                            if (err)
                                                throw err;

                                            res.send(obj);
                                        })
    }

    this.redirect = function (req, res)
    {
        res.redirect('/');
        res.end();
    }
}

module.exports = new ContentController();
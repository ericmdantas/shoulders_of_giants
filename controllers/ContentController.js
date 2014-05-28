"use strict";

var fs = require('fs');

function ContentController()
{
    var _index = function(req, res)
    {
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('views/index.html', function(err, obj)
                                        {
                                            if (err)
                                                throw err;

                                            res.send(obj);
                                        })
    }

    var _redirect = function (req, res)
    {
        res.redirect('/');
        res.end();
    }

    return {
                index: _index,
                redirect: _redirect
           }
}

module.exports = new ContentController();
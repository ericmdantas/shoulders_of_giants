"use strict";

var _index = function(req, res)
{
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('dist/index.html', function(err)
    {
        if (err)
            throw err;
    })
}

exports.index = _index;
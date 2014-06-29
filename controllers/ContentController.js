"use strict";

var fs = require('fs');

function ContentController(){}

ContentController.prototype =
{
    index: function(req, res)
           {
               res.setHeader('Content-Type', 'text/html');
               fs.readFile('views/index.html', function(err, obj)
               {
                   if (err)
                       throw err;

                   res.send(obj);
               })
           }
}


module.exports = new ContentController();
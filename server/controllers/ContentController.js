"use strict";

function ContentController(){}

ContentController.prototype =
{
    index: function(req, res)
           {
               res.setHeader('Content-Type', 'text/html');
               res.sendfile('dist/index.html', function(err)
               {
                   if (err)
                       throw err;
               })
           }
}

module.exports = new ContentController();
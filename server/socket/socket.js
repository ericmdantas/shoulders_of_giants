"use strict";

(function(quotesCtrl)
{
    var _init = function(io)
    {
        io.on('connection', function(client)
        {
            client.on('fav:quote', function(id)
            {
                quotesCtrl.favSpecificQuote(io, id)
            });
        });
    }

    exports.init = _init;
}(require('../controllers/QuotesController')))
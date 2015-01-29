"use strict";

var quotesCtrl = require('../controllers/QuotesController');

var _init = function(io)
{
    io.on('connection', function(client)
    {
        client.on('fav:quote', function(id)
        {
            quotesCtrl.favSpecificQuote(io, id)
        });
    })
}

exports.init = _init;


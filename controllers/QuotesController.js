"use strict";

var QuotesModel = require('../models/Quotes');
var lib = require('../lib/lib');

function QuotesController()
{
    var _getAllQuotes = function(req, res)
    {
        function callback(err, quotes)
        {
            err ? res.json({error: err}) : res.json({quotes: quotes});
        }

        var _quote = new QuotesModel();
        _quote.getQuotes(callback);
    }

    var _favSpecificQuote = function(req, res)
    {
        var quoteId = req.params.id;

        if (lib.isStringInvalid(quoteId))
        {
            res.json({error: 'Id não é um parâmetro no formato esperado. O mesmo deve ser uma string.'});
            return;
        }

        var callback = function(err, updated)
        {
            err ? res.json({error: err}) : res.json({updated: updated});
        }

        var _quote = new QuotesModel();
        _quote.favSpecificQuote(quoteId, callback);
    }

    return {
                getAllQuotes: _getAllQuotes,
                favSpecificQuote: _favSpecificQuote
           }
}

module.exports = new QuotesController();
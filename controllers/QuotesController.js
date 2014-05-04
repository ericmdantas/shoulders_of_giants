"use strict";

var QuotesModel = require('../models/Quotes');

function QuotesController()
{
    //TODO: ADD TESTS FOR THE CONTROLLER

    var _getAllQuotes = function(req, res)
    {
        function callback(err, quotes)
        {
            err ? res.json({error: err}) : res.json({quotes: quotes});
        }

        var _quote = new QuotesModel();
        _quote.getQuotes(callback);
    }

    var _getBestQuotes = function(req, res)
    {
        function callback(err, quotes)
        {
            err ? res.json({error: err}) : res.json({quotes: quotes});
        }

        var _quote = new QuotesModel();
        _quote.getBestQuotes(callback);
    }

    var _favSpecificQuote = function(req, res)
    {
        var quoteId = req.params.id;

        if (!quoteId || "string" !== typeof quoteId || quoteId.length === 0 || quoteId.trim().length === 0)
        {
            res.json({error: 'Id não é um parâmetro no formato esperado. O mesmo deve ser uma string.'});
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
                getBestQuotes: _getBestQuotes,
                favSpecificQuote: _favSpecificQuote
           }
}

module.exports = new QuotesController();
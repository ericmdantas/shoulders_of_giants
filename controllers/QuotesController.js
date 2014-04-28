"use strict";

var QuotesModel = require('../models/Quotes');

function QuotesController()
{
    var _getAllQuotes = function(req, res)
    {
        function callback(err, quotes)
        {
            if (err)
                res.json({error: err});
            else
                res.json({quotes: quotes});
        }

        var _quote = new QuotesModel();
        _quote.getQuotes(callback);
    }

    var _getBestQuotes = function(req, res)
    {
        function callback(err, quotes)
        {
            if (err)
                res.json({error: err});
            else
                res.json({quotes: quotes})
        }

        var _quote = new QuotesModel();
        _quote.getBestQuotes(callback);
    }

    return {
                getAllQuotes: _getAllQuotes,
                getBestQuotes: _getBestQuotes
           }
}

module.exports = new QuotesController();
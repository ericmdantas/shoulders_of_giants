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

        var quote = new QuotesModel();
        quote.getQuotes(callback);
    }

    return {
                getAllQuotes: _getAllQuotes
           }
}

module.exports = new QuotesController();
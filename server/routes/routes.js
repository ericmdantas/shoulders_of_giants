"use strict";

var content = require('../controllers/ContentController');
var quotes = require('../controllers/QuotesController');

var _init = function(app)
{
    const BASE = '/api/quotes';

    app.get('/', content.index);

    app.get(BASE, quotes.getAllQuotes);
    app.get(BASE+ '/ordered', quotes.getQuotesOrdered);
    app.post(BASE, quotes.createQuote);
    app.put(BASE + '/:id', quotes.favSpecificQuote);

    app.get('/*', content.index);
};

exports.init = _init;
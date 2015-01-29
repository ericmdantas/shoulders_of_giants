"use strict";

var content = require('../controllers/ContentController');
var contentLength = require('express-content-length-validator');
var quotes = require('../controllers/QuotesController');

var _init = function(app)
{
    var _base = '/api/quotes';

    contentLength({max: 666});

    app.post('*', contentLength.validateMax);
    app.put('*', contentLength.validateMax);

    app.get('/', content.index);

    app.get(_base, quotes.getAllQuotes);
    app.get(_base + '/ordered', quotes.getQuotesOrdered);
    app.post(_base, quotes.createQuote);
    app.put(_base + '/:id', quotes.favSpecificQuote);

    app.get('/*', content.index);
};

exports.init = _init;
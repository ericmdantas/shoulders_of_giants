"use strict";

(function(content, quotes)
{
    function _init(app)
    {
        app.get('/', content.index);
        app.get('/api/quotes', quotes.getAllQuotes);
        app.get('/api/quotes/ordered', quotes.getQuotesOrdered);
        app.put('/api/quotes/:id', quotes.favSpecificQuote);

        app.get('/*', content.index);
    }

    exports.init = _init;

}(require('../controllers/ContentController'),
  require('../controllers/QuotesController')))
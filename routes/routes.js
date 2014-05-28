"use strict";

(function(content, quotes)
{
    function _init(app)
    {
        app.get('/', content.index);
        app.get('/api/quotes', quotes.getAllQuotes);
        app.put('/api/quotes/:id', quotes.favSpecificQuote);

        app.get('/*', content.redirect);
    }

    exports.init = _init;

}(require('../controllers/ContentController'),
  require('../controllers/QuotesController')))
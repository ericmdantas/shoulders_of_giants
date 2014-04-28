"use strict";

(function(content, quotes)
{
    function _init(app)
    {
        app.get('/', content.index);
        app.get('/api/quotes', quotes.getAllQuotes);
        app.get('/api/quotes/best_of', quotes.getBestQuotes);
        app.get('/*', content.redirect);
    }

    exports.init = _init;

}(require('../controllers/ContentController'), require('../controllers/QuotesController')))
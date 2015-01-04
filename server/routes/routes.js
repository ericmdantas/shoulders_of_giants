"use strict";

(function(content, quotes)
{
    function _init(app)
    {
        var _base = '/api/quotes';

        app.get('/', content.index);

        app.get(_base, quotes.getAllQuotes);
        app.get(_base + '/ordered', quotes.getQuotesOrdered);
        app.post(_base, quotes.createQuote);
        app.put(_base + '/:id', quotes.favSpecificQuote);

        app.get('/*', content.index);
    }

    exports.init = _init;

}(require('../controllers/ContentController'),
  require('../controllers/QuotesController')))
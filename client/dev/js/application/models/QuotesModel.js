"use strict";

quotesApp.factory('QuotesModel', [function()
{
    function Quotes(info)
    {
        this.author = null;
        this.quote = null;
        this.likes = 0;

        angular.extend(this, info);
    }

    Quotes.prototype =
    {
        isValid: function()
        {
            return angular.isString(this.author) && angular.isString(this.quote);
        },

        removeQuotationMarks: function()
        {
            var _quote = this.quote;
            var _cleanQuote = /^"|^'|"$|'$/g;

            _quote = _quote.replace(_cleanQuote, '');

            return _quote;
        }
    }

    return Quotes;
}])
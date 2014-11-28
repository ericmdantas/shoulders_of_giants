"use strict";

quotesApp.factory('QuotesModel', [function()
{
    function Quotes(info)
    {
        angular.extend(this, info);
    }

    Quotes.prototype =
    {
        author: null,
        quote: null,
        likes: 0
    }

    return Quotes;
}])
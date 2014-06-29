"use strict";

quotesApp.factory('QuotesService', ['$http', function($http)
{
    var _url = '/api/quotes';

    function _getQuotes()
    {
        return $http.get(_url);
    }

    function _getQuotesOrdered(order)
    {
        if (lib.isStringInvalid(order))
            throw new Error('A ordem passada não é válida. Não será possível fazer a ordenação.');

        return $http.get(_url + '/ordered/?sort=' + order.toLowerCase());
    }

    function _favQuote(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [service].');

        return $http.put(_url + '/' + id);
    }

    return {
                getQuotes: _getQuotes,
                favQuote: _favQuote,
                getQuotesOrdered: _getQuotesOrdered
           }
}])
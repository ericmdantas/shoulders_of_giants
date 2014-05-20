"use strict";

quotesApp.factory('QuotesService', ['$http', function($http)
{
    var _url = '/api/quotes';

    function _getQuotes()
    {
        return $http.get(_url);
    }

    function _favQuote(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [service].');

        return $http.put(_url + '/' + id);
    }

    return {
                getQuotes: _getQuotes,
                favQuote: _favQuote
           }
}])
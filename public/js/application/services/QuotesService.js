"use strict";

quotesApp.factory('QuotesService', ['$http', function($http)
{
    var url = '/api/quotes';

    function _getQuotes()
    {
        return $http.get(url);
    }

    function _getBestQuotes()
    {
        return $http.get(url + '/best_of');
    }

    return {
                getQuotes: _getQuotes,
                getBestQuotes: _getBestQuotes
           }
}])
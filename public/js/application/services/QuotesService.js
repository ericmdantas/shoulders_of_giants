"use strict";

quotesApp.factory('QuotesService', ['QuotesResource', '$q', function(QuotesResource, $q)
{
    function _getQuotes()
    {
        return QuotesResource
                .query()
                .$promise;
    }

    function _getQuotesOrdered(order)
    {
        if (lib.isStringInvalid(order))
            throw new Error('A ordem passada não é válida. Não será possível fazer a ordenação.');

        return QuotesResource
                .query({type: 'ordered', sort: order})
                .$promise;
    }

    function _favQuote(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [service].');

        return QuotesResource
                .update({id: id})
                .$promise;
    }

    return {
                getQuotes: _getQuotes,
                favQuote: _favQuote,
                getQuotesOrdered: _getQuotesOrdered
           }
}])
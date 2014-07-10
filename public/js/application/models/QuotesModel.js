"use strict";

quotesApp.factory('QuotesModel', ['QuotesResource', function(QuotesResource)
{
    function Quotes(){}

    Quotes.prototype =
    {
        getAll : function ()
                {
                    return QuotesResource
                        .query()
                        .$promise;
                },

        getOrdered : function (order)
                    {
                        if (lib.isStringInvalid(order))
                            throw new Error('A ordem passada não é válida. Não será possível fazer a ordenação.');

                        return QuotesResource
                            .query({type: 'ordered', sort: order})
                            .$promise;
                    },

        favQuote : function(id)
        {
            if (lib.isStringInvalid(id))
                throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [service].');

            return QuotesResource
                .update({id: id})
                .$promise;

        }
    }

    return Quotes;
}])
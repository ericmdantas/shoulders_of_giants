"use strict";

quotesApp.controller('QuotesController', ['$scope', '$http', 'QuotesService', function($scope, $http, QuotesService)
{
    $scope.quotes = [];

    $scope.setOrder = function(order)
    {
        if (lib.isStringInvalid(order))
            throw new Error('Ordenacao incorreta. O tipo do parametro deve ser uma string.');

        $scope.getOrder = order;
    }

    $scope.getQuotes = function()
    {
        QuotesService.getQuotes()
             .success(function(data)
                     {
                        $scope.quotes = (data && data.quotes) ? data.quotes : [];
                     })
    }

    $scope.favQuote = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('O id passado nao e uma string valida. Nao sera possivel favoritar a mensagem [controller].');

        QuotesService.favQuote(id)
            .success(function(data)
            {
                var _updatedQuote;

                if (data && data.updated)
                {
                    _updatedQuote = data.updated;

                    for (var i = 0; i < $scope.quotes.length; i++)
                    {
                        if (_updatedQuote._id === $scope.quotes[i]._id)
                        {
                            $scope.quotes[i] = _updatedQuote;
                            break;
                        }
                    }
                }
            })
    }

    $scope.getQuotes();
    $scope.setOrder('author');
}])
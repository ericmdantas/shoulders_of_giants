"use strict";

quotesApp.controller('QuotesController', ['$rootScope', '$scope', '$http', 'QuotesService', function($rootScope, $scope, $http, QuotesService)
{
    $scope.quotes = [];
    $scope.quotesKeeper = [];

    $scope.setOrder = function(order)
    {
        if (lib.isStringInvalid(order))
            throw new Error('Ordenação incorreta. O tipo do parâmetro deve ser uma string.');

        $scope.getOrder = order;
    }

    $scope.getQuotes = function()
    {
        QuotesService.getQuotes()
             .success(function(data)
                     {
                        $scope.quotes = (data && data.quotes) ? data.quotes : [];
                        $scope.quotesKeeper = $scope.quotes;

                        $scope.$broadcast('QuotesReady');
                     })
    }

    $scope.favQuote = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [controller].');

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

    $scope.setSingle = function(quotes)
    {
        if (lib.isObjectInvalid(quotes))
            throw new Error('Houve um erro ao randomizar as mensagens. O objeto passado não é um objeto ou array válido.');

        var _quotesLength = quotes.length;
        var _random = Math.floor(Math.random() * _quotesLength);

        $scope.quotes = [quotes[_random]];
        $scope.singleView = true;
    }

    $scope.setMultiple = function()
    {
        $scope.quotes = $scope.quotesKeeper;
    }

    $scope.randomize = function()
    {
        var _quotesLength = $scope.quotesKeeper.length;
        var _random = Math.floor(Math.random() * _quotesLength);

        $scope.quotes = [$scope.quotesKeeper[_random]];
    }

    $scope.getQuotes();
    $scope.setOrder('author');
}])
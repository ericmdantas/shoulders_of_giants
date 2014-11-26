"use strict";

quotesApp.controller('QuotesController', ['$scope', 'QuotesModel', function($scope, QuotesModel)
{
    $scope.quotes = [];
    $scope.quotesKeeper = [];
    var _quote = new QuotesModel();

    $scope.setOrder = function(order)
    {
        if (lib.isStringInvalid(order))
            throw new Error('Ordenação incorreta. O tipo do parâmetro deve ser uma string.');

        $scope.getOrder = order;
    }

    var _getQuotes = function()
    {
        var _onSuccess = function(data)
        {
            $scope.quotes = (data) ? data : [];
            $scope.quotesKeeper = angular.copy($scope.quotes);

            $scope.$broadcast('QuotesReady');
        }

        _quote
            .getAll()
            .then(_onSuccess);
    }

    $scope.favQuote = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [controller].');

        var _onSuccess = function(data)
        {
            var _updatedQuote;

            if (data)
            {
                _updatedQuote = data;

                for (var i = 0; i < $scope.quotes.length; i++)
                {
                    if (_updatedQuote._id === $scope.quotes[i]._id)
                    {
                        $scope.quotes[i] = _updatedQuote;
                        break;
                    }
                }
            }
        };

        _quote
            .favQuote(id)
            .then(_onSuccess);
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
        $scope.singleView = false;
        $scope.quotes = $scope.quotesKeeper;
    }

    $scope.randomize = function()
    {
        var _quotesLength = $scope.quotesKeeper.length;
        var _random = Math.floor(Math.random() * _quotesLength);

        $scope.quotes = [$scope.quotesKeeper[_random]];
    }

    $scope.setOrder('author');
    _getQuotes();
}])
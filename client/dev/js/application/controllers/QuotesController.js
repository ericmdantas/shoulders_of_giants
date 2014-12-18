"use strict";

quotesApp.controller('QuotesController', ['$scope', 'QuotesModel', 'QuotesDAO', 'SocketService', 'Randomizer', function($scope, QuotesModel, QuotesDAO, SocketService, Randomizer)
{
    $scope.quotes = [];
    $scope.quotesKeeper = [];
    $scope.favQuote = QuotesDAO.favQuote;

    SocketService.on('quote:faved', function(id)
    {
        for (var i = 0; i < $scope.quotes.length; i++)
        {
            if (id === $scope.quotes[i]._id)
            {
                $scope.quotes[i].likes += 1;
                break;
            }
        }
    });

    $scope.setOrder = function(order)
    {
        if (!angular.isString(order))
            throw new Error('Ordenação incorreta. O tipo do parâmetro deve ser uma string.');

        $scope.getOrder = order;
    }

    var _getQuotes = function()
    {
        var _onSuccess = function(quotes)
        {
            $scope.quotes = quotes;
            $scope.quotesKeeper = angular.copy($scope.quotes);

            $scope.$broadcast('quotes-ready');
        }

        QuotesDAO
            .getAll()
            .then(_onSuccess);
    }

    $scope.setSingle = function(quotes)
    {
        if (!angular.isArray(quotes))
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
        $scope.quotes = Randomizer.shuffleSingle($scope.quotesKeeper);
    }

    $scope.setOrder('author');

    _getQuotes();
}])
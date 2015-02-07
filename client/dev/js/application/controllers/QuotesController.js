"use strict";

quotesApp.controller('QuotesController', ['$rootScope', '$scope', 'QuotesModel', 'QuotesDAO', 'SocketService', 'Randomizer', '$timeout', function($rootScope, $scope, QuotesModel, QuotesDAO, SocketService, Randomizer, $timeout)
{
    $scope.quotes = [];
    $scope.quotesKeeper = [];
    $scope.errorQuoteCreation = null;
    $scope.favQuote = QuotesDAO.favQuote;
    $scope.quoteInstance = new QuotesModel();

    var _getQuotes = function()
    {
        var _onSuccess = function(quotes)
        {
            $scope.quotes = quotes;
            $scope.quotesKeeper = angular.copy($scope.quotes);
        }

        QuotesDAO
            .getAll()
            .then(_onSuccess);
    }

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

    $scope.createQuote = function(quote)
    {
        var _onSuccess = function(quote)
        {
            $scope.errorQuoteCreation = null;
            $scope.quoteInstance = new QuotesModel();

            $scope.quotes.push(quote);
        }

        var _onError = function(error)
        {
            $scope.errorQuoteCreation = error.msg;
        }

        QuotesDAO
            .createQuote(quote)
            .then(_onSuccess, _onError);
    }

    $scope.setSingle = function(quotes)
    {
        if (!angular.isArray(quotes))
            throw new Error('Houve um erro ao randomizar as mensagens. O objeto passado não é um objeto ou array válido.');

        $scope.quotes = Randomizer.shuffleSingle($scope.quotes);
        $scope.singleView = true;
    }

    $scope.setMultiple = function()
    {
        $scope.quotes = $scope.quotesKeeper;
        $scope.singleView = false;
    }

    $scope.randomize = function()
    {
        $scope.quotes = Randomizer.shuffleSingle($scope.quotesKeeper);
    }

    $scope.setOrder('author');

    _getQuotes();
}])
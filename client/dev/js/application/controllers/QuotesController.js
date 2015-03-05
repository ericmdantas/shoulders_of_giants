"use strict";

quotesApp.controller('QuotesController', ['$rootScope', '$scope', 'QuotesModel', 'QuotesDAO', 'SocketService', 'Randomizer', function($rootScope, $scope, QuotesModel, QuotesDAO, SocketService, Randomizer)
{
    $scope.quotes = [];
    $scope.quotesKeeper = [];
    $scope.favQuote = QuotesDAO.favQuote;
    $scope.quoteInstance = new QuotesModel();
    $scope.order = 'author';

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

    SocketService.on('quote:faved', function(quoteUpdated)
    {
        angular.forEach($scope.quotes, function(quote, index)
        {
            if (quote._id === quoteUpdated._id)
                $scope.quotes[index].likes = quoteUpdated.likes;
        })
    });

    $scope.createQuote = function(quote)
    {
        var _onSuccess = function(quote)
        {
            $scope.quoteInstance = new QuotesModel();

            $scope.quotes.push(quote);
        }

        QuotesDAO
            .createQuote(quote)
            .then(_onSuccess);
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

    $scope.setOrder = function(order)
    {
        $scope.order = order;
    }

    $scope.randomize = function()
    {
        $scope.quotes = Randomizer.shuffleSingle($scope.quotesKeeper);
    }

    $scope.shuffle = function()
    {
        $scope.setOrder(null);

        Randomizer.shuffle($scope.quotes);
    };

    _getQuotes();
}])
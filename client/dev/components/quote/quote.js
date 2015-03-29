"use strict";

quotesApp.controller('QuoteController', ['$rootScope', 'QuotesModel', 'QuotesDAO', 'SocketService', 'Randomizer', function($rootScope, QuotesModel, QuotesDAO, SocketService, Randomizer)
{
    var self = this;

    self.quotes = [];
    self.quotesKeeper = [];
    self.favQuote = QuotesDAO.favQuote;
    self.quoteInstance = new QuotesModel();
    self.order = 'author';

    var _getQuotes = function()
    {
        var _onSuccess = function(quotes)
        {
            self.quotes = quotes;
            self.quotesKeeper = angular.copy(self.quotes);
        }

        QuotesDAO
            .getAll()
            .then(_onSuccess);
    }

    self.__onFavorited = function(quoteUpdated)
    {
        angular.forEach(self.quotes, function(quote, index)
        {
            if (quote._id === quoteUpdated._id)
                self.quotes[index].likes = quoteUpdated.likes;
        });
    };

    SocketService.on('quote:faved', self.__onFavorited);

    self.createQuote = function(quote)
    {
        var _onSuccess = function(quote)
        {
            self.quoteInstance = new QuotesModel();

            self.quotes.push(quote);
        }

        QuotesDAO
            .createQuote(quote)
            .then(_onSuccess);
    }

    self.setSingle = function(quotes)
    {
        if (!angular.isArray(quotes))
            throw new Error('Houve um erro ao randomizar as mensagens. O objeto passado não é um objeto ou array válido.');

        self.quotes = Randomizer.shuffleSingle(self.quotes);
        self.singleView = true;
    }

    self.setMultiple = function()
    {
        self.quotes = self.quotesKeeper;
        self.singleView = false;
    }

    self.setOrder = function(order)
    {
        self.order = order;
    }

    self.randomize = function()
    {
        self.quotes = Randomizer.shuffleSingle(self.quotesKeeper);
    }

    self.shuffle = function()
    {
        self.setOrder(null);

        Randomizer.shuffle(self.quotes);
    };

    _getQuotes();
}]);
"use strict";

quotesApp.service('QuotesDAO', ['$q', 'SocketService', 'QuotesModel', 'QuotesResource', function($q, SocketService, QuotesModel, QuotesResource)
{
    var _getAll = function ()
    {
        var deferred = $q.defer();

        var _onSuccess = function(quotes)
        {
            var _quotes = [];

            angular.forEach(quotes, function(quote)
            {
                _quotes.push(new QuotesModel(quote));
            })

            deferred.resolve(_quotes);
        }

        QuotesResource
            .query()
            .$promise
            .then(_onSuccess);

        return deferred.promise;
    };

    var _favQuote = function(id)
    {
        if (!angular.isString(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem.');

        SocketService.emit('fav:quote', id);
    };

    var _createQuote = function(quote)
    {
        var deferred = $q.defer();

        var _onSuccess = function()
        {
            deferred.resolve();
        }

        var _onError = function(error)
        {
            var _error = {msg: error.data.error, status: error.status};

            deferred.reject(_error);
        }

        if (!angular.isObject(quote) || !(quote instanceof QuotesModel) || !quote.isValid())
        {
            deferred.reject(new Error('Não é possível criar uma nova frase, pois a mesma não é válida.'));
            return deferred.promise;
        }

        QuotesResource
            .save(quote)
            .$promise
            .then(_onSuccess, _onError);

        return deferred.promise;
    }

    this.getAll = _getAll;
    this.favQuote = _favQuote;
    this.createQuote = _createQuote;
}])

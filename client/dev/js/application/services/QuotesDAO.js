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

    this.getAll = _getAll;
    this.favQuote = _favQuote;
}])

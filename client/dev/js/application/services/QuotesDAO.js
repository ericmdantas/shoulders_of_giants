"use strict";

quotesApp.service('QuotesDAO', ['$q', '$xtorage', 'SocketService', 'QuotesModel', 'QuotesCache', 'QuotesResource', 'QUOTE_LIKED_KEY', function($q, $xtorage, SocketService, QuotesModel, QuotesCache, QuotesResource, QUOTE_LIKED_KEY)
{
    var _getAll = function ()
    {
        return $q(function(resolve, reject)
        {
            /*

             TODO: remove comment when the logic behind expiration is good enough

             var _quotes = QuotesCache.getArray();

             if (_quotes)
             return $q.when(_quotes);*/

            var _onSuccess = function(quotes)
            {
                var _quotes = [];
                var _quotesLiked = $xtorage.getFromLocalStorage(QUOTE_LIKED_KEY) || [];

                angular.forEach(quotes, function(quote)
                {
                    angular.forEach(_quotesLiked, function(qLiked)
                    {
                        if (qLiked === quote._id)
                            quote.alreadyLiked = true;

                    })

                    _quotes.push(new QuotesModel(quote));
                })

                //QuotesCache.saveArray(_quotes);

                resolve(_quotes);
            }

            QuotesResource
                .query()
                .$promise
                .then(_onSuccess);
        })
    };

    var _favQuote = function(id)
    {
        if (!angular.isString(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem.');

        SocketService.emit('fav:quote', id);
    };

    var _createQuote = function(quote)
    {
        return $q(function(resolve, reject)
        {
            var _onSuccess = function(quote)
            {
                var _quote = new QuotesModel(quote);

                resolve(_quote);
            }

            var _onError = function(error)
            {
                var _error = {msg: error.data.error, status: error.status};

                reject(_error);
            }

            if (!angular.isObject(quote) || !(quote instanceof QuotesModel) || !quote.isValid())
                return reject(new Error('Não é possível criar uma nova frase, pois a mesma não é válida.'));

            quote.quote = quote.removeQuotationMarks();

            QuotesResource
                .save(quote, _onSuccess, _onError)
                .$promise
                .then(_onSuccess)
                .catch(_onError);
        })

    }

    this.getAll = _getAll;
    this.favQuote = _favQuote;
    this.createQuote = _createQuote;
}])

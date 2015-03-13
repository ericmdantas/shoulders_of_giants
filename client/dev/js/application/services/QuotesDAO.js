"use strict";

quotesApp.service('QuotesDAO', ['$q', '$xtorage', 'SocketService', 'QuotesModel', 'QuotesCache', 'QuotesResource', 'QUOTE_LIKED_KEY', function($q, $xtorage, SocketService, QuotesModel, QuotesCache, QuotesResource, QUOTE_LIKED_KEY)
{
    var _getAll = function ()
    {
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

            return _quotes;
        }

        return QuotesResource
                    .query()
                    .$promise
                    .then(_onSuccess);
    };

    var _favQuote = function(id)
    {
        if (!angular.isString(id))
            throw new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem.');

        SocketService.emit('fav:quote', id);
    };

    var _createQuote = function(quote)
    {
        var _onSuccess = function(quote)
        {
            var _quote = new QuotesModel(quote);

            return _quote;
        }

        var _onError = function(error)
        {
            var _error = {msg: error.data.error, status: error.status};

            return $q.reject(_error);
        }

        if (!angular.isObject(quote) || !(quote instanceof QuotesModel) || !quote.isValid())
            return $q.reject(new Error('Não é possível criar uma nova frase, pois a mesma não é válida.'));

        quote.quote = quote.removeQuotationMarks();

        return QuotesResource
                    .save(quote)
                    .$promise
                    .then(_onSuccess)
                    .catch(_onError);
    }

    this.getAll = _getAll;
    this.favQuote = _favQuote;
    this.createQuote = _createQuote;
}])

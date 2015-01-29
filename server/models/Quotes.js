"use strict";

var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('lodash');
var quotesSchema = require('../schemas/quotesSchema').quotesSchema;

quotesSchema.statics.getQuotes = function()
{
    var deferred = Promise.pending();

    var _query = {};
    var _projection = {};

    Quote
        .find(_query, _projection)
        .sort('quote')
        .exec(function(err, quotes)
        {
            err ? deferred.reject(err)
                : deferred.resolve(quotes);
        })

    return deferred.promise;
};

quotesSchema.statics.favSpecificQuote = function(id)
{
        var deferred = Promise.pending();

        if (!_.isString(id))
        {
            deferred.reject(new Error('Impossível favoritar mensagem. Id deve ser uma string.'));
            return deferred.promise;
        }


        var _query = {_id: id};
        var _updt = {$inc: {likes: 1}};

        Quote
            .findOneAndUpdate(_query, _updt)
            .exec(function(err, updated)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(updated);
            })

        return deferred.promise;
};

quotesSchema.statics.getQuotesOrderedBy = function(order)
{
    var deferred = Promise.pending();

    if (!_.isString(order))
    {
        deferred.reject(new Error('Não é possível ordenar as frases com o parâmetro passado. Parâmetro order errado.'));
        return deferred.promise;
    }

    var _order = order.toLowerCase();

    var _query = {};
    var _projection = {};

    Quote
        .find(_query, _projection)
        .sort(_order)
        .exec(function(err, quotes)
        {
            err ? deferred.reject(err)
                : deferred.resolve(quotes);
        })

    return deferred.promise;
}

quotesSchema.statics.createQuote = function(quote)
{
    var deferred = Promise.pending();

    if (!_.isObject(quote))
    {
        deferred.reject(new Error('Não é possível criar uma frase com um objeto vazio.'));
        return deferred.promise;
    }

    var _onSave = function(error, saved)
    {
        error ? deferred.reject(error)
            : deferred.resolve(saved);
    }

    new Quote(quote)
        .save(_onSave);

    return deferred.promise;
}

var Quote = mongoose.model('Quote', quotesSchema);

module.exports = Quote;
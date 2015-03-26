"use strict";

import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';
import {quotesSchema} from '../schemas/quotesSchema';

quotesSchema.statics.getQuotes = () =>
{
    return new Promise(function(resolve, reject)
    {
        var _query = {};
        var _projection = {};

        Quote
            .find(_query, _projection)
            .sort('quote')
            .exec(function(err, quotes)
            {
                err ? reject(err)
                    : resolve(quotes);
            });
    })
};

quotesSchema.statics.favSpecificQuote = id =>
{
        return new Promise(function(resolve, reject)
        {
            if (!_.isString(id))
            {
                reject(new Error('Impossível favoritar mensagem. Id deve ser uma string.'));
                return;
            }

            var _query = {_id: id};
            var _updt = {$inc: {likes: 1}, lastLiked: Date.now()};

            Quote
                .findOneAndUpdate(_query, _updt)
                .exec(function(err, updated)
                {
                    err ? reject(err)
                        : resolve(updated);
                });
        })
};

quotesSchema.statics.getQuotesOrderedBy = order =>
{
    return new Promise(function(resolve, reject)
    {
        if (!_.isString(order))
        {
            reject(new Error('Não é possível ordenar as frases com o parâmetro passado. Parâmetro order errado.'));
            return;
        }

        var _order = order.toLowerCase();

        var _query = {};
        var _projection = {};

        Quote
            .find(_query, _projection)
            .sort(_order)
            .exec(function(err, quotes)
            {
                err ? reject(err)
                    : resolve(quotes);
            });
    });
}

quotesSchema.statics.createQuote = quote =>
{
    return new Promise(function(resolve, reject)
    {
        if (!_.isObject(quote))
        {
            reject(new Error('Não é possível criar uma frase com um objeto vazio.'));
            return;
        }

        var _onSave = function(error, saved)
        {
            error ? reject(error)
                  : resolve(saved);
        }

        var _quote = new Quote(quote);

        _quote.save(_onSave);
    });
}

var Quote = mongoose.model('Quote', quotesSchema);

export default Quote;
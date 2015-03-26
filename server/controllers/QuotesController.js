"use strict";

import Quotes from '../dal/QuotesDAO';

export default class QuotesController
{
    static getAllQuotes(req, res)
    {
        var _successCallback = function(quotes)
        {
            res
                .status(200)
                .json(quotes);
        }

        var _errorCallback = function(err)
        {
            res
                .status(400)
                .json({error: err});
        }

        Quotes
            .getQuotes()
            .then(_successCallback)
            .catch(_errorCallback)
            .done();
    };

    static favSpecificQuote(io, id)
    {
        var quoteId = id;

        var _successCallback = function(updated)
        {
            io.emit('quote:faved', updated);
        }

        var _errorCallback = function(err)
        {
            io.emit('fav:error', err);
        }

        Quotes
            .favSpecificQuote(quoteId)
            .then(_successCallback)
            .catch(_errorCallback)
            .done();
    }

    static getQuotesOrdered(req, res)
    {
        var _order = req.query.sort;

        var _successCallback = function(quotes)
        {
            res
                .status(200)
                .json(quotes);
        }

        var _errorCallback = function(err)
        {
            res
                .status(400)
                .json({error: 'Houve um erro no momento da ordenação das frases.'});
        }

        Quotes
            .getQuotesOrderedBy(_order)
            .then(_successCallback)
            .catch(_errorCallback)
            .done();
    }

    static createQuote(req, res)
    {
        var _quote = req.body;

        var _onSuccess = function(quote)
        {
            res
                .status(200)
                .json(quote);
        }

        var _onError = function(error)
        {
            res
                .status(400)
                .json(error);
        }

        Quotes
            .createQuote(_quote)
            .then(_onSuccess)
            .catch(_onError)
            .done();
    }
}
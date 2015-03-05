"use strict";

var Quotes = require('../DAL/QuotesDAO');
var _ = require('lodash');

function QuotesController(){}

QuotesController.getAllQuotes = function(req, res)
{
   function _successCallback(quotes)
   {
       res
           .status(200)
           .json(quotes);
   }

   function _errorCallback(err)
   {
       res
           .status(400)
           .json({error: err});
   }

   function _exceptionCallback(ex)
   {
       res
           .status(500)
           .json({error: ex});
   }

   Quotes
       .getQuotes()
       .then(_successCallback, _errorCallback)
       .catch(_exceptionCallback)
       .done();
};


QuotesController.favSpecificQuote = function(io, id)
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

   var _exceptionCallback = function(ex)
   {
       io.emit('fav:exception', ex);
   }

   Quotes
       .favSpecificQuote(quoteId)
       .then(_successCallback, _errorCallback)
       .catch(_exceptionCallback)
       .done();
}

QuotesController.getQuotesOrdered = function(req, res)
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

   var _exceptionCallback = function(err)
   {
       res
           .status(500)
           .json(err);
   }

   Quotes
       .getQuotesOrderedBy(_order)
       .then(_successCallback, _errorCallback)
       .catch(_exceptionCallback)
       .done();
}

QuotesController.createQuote = function(req, res)
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

    var _onException = function(ex)
    {
        res
            .status(500)
            .json(ex);
    }

    Quotes
        .createQuote(_quote)
        .then(_onSuccess, _onError)
        .catch(_onException)
        .done();
}

module.exports = QuotesController;
"use strict";

var QuotesModel = require('../models/Quotes');
var _ = require('lodash');

function QuotesController(){}

QuotesController.prototype =
{
    getAllQuotes : function(req, res)
                   {
                       function _successCallback(quotes)
                       {
                           res.json(quotes);
                       }

                       function _errorCallback(erro)
                       {
                           res.json({error: err});
                       }

                       function _exceptionCallback(ex)
                       {
                           res.json({error: ex});
                       }

                       var _quote = new QuotesModel();

                       _quote
                           .getQuotes()
                           .then(_successCallback, _errorCallback)
                           .catch(_exceptionCallback)
                           .done();
                   },

    favSpecificQuote : function(io, id)
                       {
                           var quoteId = id;

                           if (!_.isString(quoteId))
                           {
                               io.emit('fav:error', {error: 'Id não é um parâmetro no formato esperado. O mesmo deve ser uma string.'});
                               return;
                           }

                           var _successCallback = function(updated)
                           {
                               io.emit('quote:faved', updated._id);
                           }

                           var _errorCallback = function(err)
                           {
                               io.emit('fav:error', err);
                           }

                           var _exceptionCallback = function(ex)
                           {
                               io.emit('fav:exception', ex);
                           }

                           var _quote = new QuotesModel();

                           _quote
                               .favSpecificQuote(quoteId)
                               .then(_successCallback, _errorCallback)
                               .catch(_exceptionCallback)
                               .done();
                       },

    getQuotesOrdered : function(req, res)
                       {
                            var _order = req.query.sort;

                            if (_.isString(_order))
                            {
                                res.json({error: 'O método de ordenação não é válido.'});
                                return;
                            }

                           var _successCallback = function(quotes)
                           {
                                res.json(quotes);
                           }

                           var _errorCallback = function(err)
                           {
                               res.json({error: 'Houve um erro no momento da ordenação das frases.'});
                           }

                           var _exceptionCallback = function(err)
                           {
                               res.json(err)
                           }

                           var _quote = new QuotesModel();

                           _quote
                               .getQuotesOrderedBy(_order)
                               .then(_successCallback, _errorCallback)
                               .catch(_exceptionCallback)
                               .done();
                       }
}

module.exports = new QuotesController();
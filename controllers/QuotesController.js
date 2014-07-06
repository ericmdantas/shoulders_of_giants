"use strict";

var QuotesModel = require('../models/Quotes');
var lib = require('../public/js/application/lib/lib');

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
                           .fail(_exceptionCallback);
                   },

    favSpecificQuote : function(req, res)
                       {
                           var quoteId = req.params.id;

                           if (lib.isStringInvalid(quoteId))
                           {
                               res.json({error: 'Id não é um parâmetro no formato esperado. O mesmo deve ser uma string.'});
                               return;
                           }

                           var _successCallback = function(updated)
                           {
                               res.json(updated);
                           }

                           var _errorCallback = function(err)
                           {
                               res.json({error: err});
                           }

                           var _exceptionCallback = function(ex)
                           {
                               res.json({error: ex});
                           }

                           var _quote = new QuotesModel();

                           _quote
                               .favSpecificQuote(quoteId)
                               .then(_successCallback, _errorCallback)
                               .fail(_exceptionCallback);
                       },

    getQuotesOrdered : function(req, res)
                       {
                            var _order = req.query.sort;

                            if (lib.isStringInvalid(_order))
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
                               .fail(_exceptionCallback);
                       }
}

module.exports = new QuotesController();
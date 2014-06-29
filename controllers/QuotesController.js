"use strict";

var QuotesModel = require('../models/Quotes');
var lib = require('../public/js/application/lib/lib');

function QuotesController(){}

QuotesController.prototype =
{
    getAllQuotes : function(req, res)
                   {
                       function _callback(err, quotes)
                       {
                           err ? res.json({error: err}) : res.json({quotes: quotes});
                       }

                       var _quote = new QuotesModel();
                       _quote.getQuotes(_callback);
                   },

    favSpecificQuote : function(req, res)
                       {
                           var quoteId = req.params.id;

                           if (lib.isStringInvalid(quoteId))
                           {
                               res.json({error: 'Id não é um parâmetro no formato esperado. O mesmo deve ser uma string.'});
                               return;
                           }

                           var _callback = function(err, updated)
                           {
                               err ? res.json({error: err}) : res.json({updated: updated});
                           }

                           var _quote = new QuotesModel();
                           _quote.favSpecificQuote(quoteId, _callback);
                       },

    getQuotesOrdered : function(req, res)
                       {
                            var _order = req.query.sort;

                            if (lib.isStringInvalid(_order))
                            {
                                res.json({error: 'O método de ordenação não é válido.'});
                                return;
                            }

                           var _callback = function(err, quotes)
                           {
                                if (err)
                                {
                                    res.json({error: 'Houve um erro no momento da ordenação das frases.'});
                                    return;
                                }

                                res.json({quotes: quotes});
                           }

                           var _quote = new QuotesModel();
                           _quote.getQuotesOrderedBy(_order, _callback);
                       }
}

module.exports = new QuotesController();
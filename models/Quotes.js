"use strict";

(function(mongoose, Q, lib)
{
    var quoteSchema = mongoose.Schema
        ({
            quote: {type: String, trim: true, required: true, index: true},
            author: {type: String, trim: true, required: true, index: true},
            likes: {type: Number, trim: true, required: true, index: true}
        });

    quoteSchema.methods =
    {
        getQuotes : function()
                    {
                        var deferred = Q.defer();

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
                    },

        favSpecificQuote : function(id)
                           {
                               var deferred = Q.defer();

                               if (lib.isStringInvalid(id))
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
                           },

        getQuotesOrderedBy : function(order)
                             {
                                    var deferred = Q.defer();

                                    if (lib.isStringInvalid(order))
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
    }

    var Quote = mongoose.model('Quote', quoteSchema);
    module.exports = Quote;

}(require('mongoose'),
  require('q'),
  require('../public/js/application/lib/lib')))
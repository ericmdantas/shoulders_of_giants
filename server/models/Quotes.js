"use strict";

(function(mongoose, Promise, _, quotesSchema)
{
    quotesSchema.methods =
    {
        getQuotes : function()
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
                    },

        favSpecificQuote : function(id)
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
                           },

        getQuotesOrderedBy : function(order)
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
    }

    var Quote = mongoose.model('Quote', quotesSchema);
    module.exports = Quote;

}(require('mongoose'),
  require('bluebird'),
  require('lodash'),
  require('../schemas/quotesSchema').quotesSchema))
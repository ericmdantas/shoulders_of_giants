"use strict";

(function(mongoose, lib)
{
    var quoteSchema = mongoose.Schema
        ({
            quote: {type: String, trim: true, required: true, index: true},
            author: {type: String, trim: true, required: true, index: true},
            likes: {type: Number, trim: true, required: true, index: true}
        });

    quoteSchema.methods =
    {
        getQuotes : function(done)
                    {
                        var _query = {};
                        var _projection = {};

                        Quote.find(_query, _projection)
                            .sort('quote')
                            .exec(function(err, quotes)
                            {
                                if (err)
                                    return done(err, null);

                                return done(null, quotes);
                            })
                    },

        favSpecificQuote : function(id, done)
                           {
                               if (lib.isStringInvalid(id))
                                   return done(new Error('Impossível favoritar mensagem. Id deve ser uma string.'), null);

                               if (lib.isFunctionInvalid(done))
                                   return done(new Error('Impossível favoritar mensagem. Callback não é uma função válida.', null));

                               var _query = {_id: id};
                               var _updt = {$inc: {likes: 1}};

                               Quote.findOneAndUpdate(_query, _updt)
                                   .exec(function(err, updated)
                                   {
                                       if (err)
                                           return done(err, null);

                                       return done(null, updated);
                                   })
                           },

        getQuotesOrderedBy : function(order, done)
                             {
                                    if (lib.isStringInvalid(order))
                                        return done(new Error('Não é possível ordenar as frases com o parâmetro passado. Parâmetro order errado.'), null);

                                    if (lib.isFunctionInvalid(done))
                                        return done(new Error('Não é possível ordenar as frases com a callback passada.', null));

                                    var _order = order.toLowerCase();

                                    var _query = {};
                                    var _projection = {};

                                    Quote.find(_query, _projection)
                                        .sort(_order)
                                        .exec(function(err, quotes)
                                        {
                                            if (err)
                                                return done(err, null);

                                            return done(null, quotes);
                                        })
                             }
    }

    var Quote = mongoose.model('Quote', quoteSchema);
    module.exports = Quote;

}(require('mongoose'),
  require('../public/js/application/lib/lib')))
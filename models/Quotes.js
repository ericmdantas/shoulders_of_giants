"use strict";

(function(mongoose)
{
    var quoteSchema = mongoose.Schema
        ({
            quote: {type: String, trim: true, required: true, index: true},
            author: {type: String, trim: true, required: true, index: true},
            likes: {type: Number, trim: true, required: true, index: true}
        });

    quoteSchema.methods.getQuotes = function(done)
    {
        var _query = {};
        var _projection = {};

        Quote.find(_query, _projection)
             .exec(function(err, quotes)
                   {
                      if (err)
                          return done(err, null);

                      return done(null, quotes);
                   })
    }

    quoteSchema.methods.getBestQuotes = function(done)
    {
        var _query = {};
        var _projection = {};

        Quote.find(_query, _projection)
             .sort('-likes')
             .exec(function(err, quotes)
                   {
                        if (err)
                            return done(err, null);

                        return done(null, quotes);
                   })
    }

    quoteSchema.methods.favSpecificQuote = function(id, done)
    {
        if (!id || "string" !== typeof id || id.length === 0 || id.trim().length === 0)
            return done(new Error('Impossível favoritar mensagem. Id deve ser uma string.'), null);

        var _query = {_id: id};
        var _updt = {$inc: {likes: 1}};

        Quote.findOneAndUpdate(_query, _updt)
             .exec(function(err, updated)
                  {
                        if (err)
                            return done(err, null);

                        return done(null, updated);
                  })
    }

    var Quote = mongoose.model('Quote', quoteSchema);
    module.exports = Quote;

}(require('mongoose')))
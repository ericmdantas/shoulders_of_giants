"use strict";

(function(mongoose)
{
    var quoteSchema = mongoose.Schema
        ({
            quote: {type: String, trim: true, required: true, index: true},
            author: {type: String, trim: true, required: true, index: true},
            likes: {type: String, trim: true, required: true, index: true}
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

    var Quote = mongoose.model('Quote', quoteSchema);
    module.exports = Quote;
}(require('mongoose')))
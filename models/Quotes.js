"use strict";

var mongoose = require('mongoose');

(function()
{
    var quoteSchema = mongoose.Schema
        ({
            quote: {type: String, trim: true, required: true, index: true},
            author: {type: String, trim: true, required: true, index: true},
            likes: {type: String, trim: true}
        });

    quoteSchema.methods.getQuotes = function(done)
    {
        var query = {};
        var projection = {};

        Quote.find(query, projection)
             .exec(function(err, quotes)
                   {
                      if (err)
                          return done(err, null);

                      return done(null, quotes);
                   })
    }

    var Quote = mongoose.model('Quote', quoteSchema);
    module.exports = Quote;
}())
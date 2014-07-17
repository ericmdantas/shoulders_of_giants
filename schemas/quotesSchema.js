"use strict";

(function(mongoose)
{
    var _quotesSchema = mongoose.Schema
    ({
        quote: {type: String, trim: true, required: true, index: true},
        author: {type: String, trim: true, required: true, index: true},
        likes: {type: Number, trim: true, required: true, index: true}
    });

    exports.quotesSchema = _quotesSchema;

}(require('mongoose')))
"use strict";

(function(mongoose)
{
    var _quotesSchema = mongoose.Schema
    ({
        quote: {type: String, trim: true, required: true, index: true},
        author: {type: String, trim: true, required: true, index: true},
        likes: {type: Number, index: true, default: 0},
        lastLiked: {type: Date},
        createdAt: {type: Date, default: Date.now}
    });

    exports.quotesSchema = _quotesSchema;

}(require('mongoose')))
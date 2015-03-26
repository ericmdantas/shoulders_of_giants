"use strict";

import mongoose from 'mongoose';

const _quotesSchema = mongoose.Schema
({
    quote: {type: String, trim: true, required: true, index: true},
    author: {type: String, trim: true, required: true, index: true},
    likes: {type: Number, index: true, default: 0},
    lastLiked: {type: Date},
    createdAt: {type: Date, default: Date.now}
});

export var quotesSchema = _quotesSchema;
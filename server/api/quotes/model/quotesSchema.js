"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireWildcard(_mongoose);

"use strict";

var _quotesSchema = _mongoose2["default"].Schema({
    quote: { type: String, trim: true, required: true, index: true },
    author: { type: String, trim: true, required: true, index: true },
    likes: { type: Number, index: true, "default": 0 },
    lastLiked: { type: Date },
    createdAt: { type: Date, "default": Date.now }
});

var quotesSchema = _quotesSchema;
exports.quotesSchema = quotesSchema;
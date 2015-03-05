"use strict";

var mongoose = require('mongoose');

var _init = function()
{
    const URL_BANCO = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL
                                                              : 'mongodb://localhost/quotes';

    mongoose.connect(URL_BANCO);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'deu ruim: '));
};

exports.init = _init;
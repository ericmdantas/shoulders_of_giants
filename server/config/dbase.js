"use strict";

var mongoose = require('mongoose');

var _init = function()
{
    var url_banco = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL
                                                            : 'mongodb://localhost/quotes';

    mongoose.connect(url_banco);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'deu ruim: '));
};

exports.init = _init;
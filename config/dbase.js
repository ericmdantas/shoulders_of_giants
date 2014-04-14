"use strict";

var mongoose = require('mongoose');

(function()
{
    var url_banco = 'mongodb://localhost/quotes';

    function _init()
    {
        mongoose.connect(url_banco);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'deu ruim: '));
    }

    exports.init = _init;
}())


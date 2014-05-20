"use strict";

var Quotes = require('../../models/Quotes');

var helper = (function()
{
    var _create = function(str, done)
    {
        str = str.toLowerCase();

        switch (str)
        {
            case "quotes": _createQuoteModel(done);
                break;

            default: throw new Error('Nenhum modelo especificado para criação.');
        }
    }

    var _createQuoteModel = function(done)
    {
        Quotes.create({author: "eric1", quote:  "mensagem1", likes: 1},
                      {author: "eric1", quote:  "mensagem1", likes: 96},
                      {author: "eric2", quote:  "mensagem2", likes: 2},
                      {author: "eric3", quote:  "mensagem3", likes: 97},
                      {author: "eric4", quote:  "mensagem4", likes: 98},
                      {author: "eric5", quote:  "mensagem5", likes: 99},
                      {_id: '535d85946ab81777bf583d26', author: "eric0", quote:  "mensagem0", likes: 10},
                      {author: "eric2", quote:  "mensagem2", likes: 0},
                      {_id: '535d85946ab81777bf583d28', author: "eric3", quote:  "mensagem3", likes: 100000},
                      {author: "eric4", quote:  "mensagem4", likes: 0},
                      {author: "eric5", quote:  "mensagem5", likes: 0}, done);
    }

    exports.create = _create;
}())
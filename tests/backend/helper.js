"use strict";

var Quotes = require('../../server/models/Quotes');

(function()
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
        var _arrayDocs = [{author: "eric1", quote:  "mensagem1", likes: 1},
                            {author: "eric6", quote:  "mensagem6", likes: 6},
                            {author: "eric2", quote:  "mensagem2", likes: 2},
                            {author: "eric3", quote:  "mensagem3", likes: 3},
                            {author: "eric4", quote:  "mensagem4", likes: 4},
                            {author: "eric5", quote:  "mensagem5", likes: 5},
                            {_id: '535d85946ab81777bf583d26', author: "eric0", quote:  "mensagem0", likes: 0},
                            {author: "eric9", quote:  "mensagem9", likes: 9},
                            {_id: '535d85946ab81777bf583d28', author: "eric3", quote:  "mensagem3", likes: 3},
                            {author: "eric7", quote:  "mensagem7", likes: 7},
                            {author: "eric8", quote:  "mensagem8", likes: 8}]

        Quotes
            .create(_arrayDocs)
            .then(function()
            {
                done();
            });
    }

    exports.create = _create;
}())
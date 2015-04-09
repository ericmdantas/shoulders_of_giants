"use strict";

import quotesCtrl from '../controllers/QuotesController';

export default class SocketEvents
{
    static init(io)
    {
        io.on('connection', function(client)
        {
            client.on('fav:quote', function(id)
            {
                quotesCtrl.favSpecificQuote(io, id)
            });
        })
    }
}
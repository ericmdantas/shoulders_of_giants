"use strict";

import StaticController from '../controllers/ContentController';
import QuotesController from '../controllers/QuotesController';

export default class Routes
{
    static init(app)
    {
        const BASE = '/api/quotes';

        app.get('/', StaticController.sendIndex);

        app.get(BASE, QuotesController.getAllQuotes);
        app.get(BASE+ '/ordered', QuotesController.getQuotesOrdered);
        app.post(BASE, QuotesController.createQuote);
        app.put(BASE + '/:id', QuotesController.favSpecificQuote);

        app.get('/*', StaticController.sendIndex);
    }
}
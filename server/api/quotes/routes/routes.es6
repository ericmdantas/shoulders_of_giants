"use strict";

import StaticController from '../../../commons/static/index';
import QuotesController from '../controllers/QuotesController';

export default class Routes
{
    static init(router)
    {
        const BASE = '/api/quotes';

        router.get(BASE, QuotesController.getAllQuotes);
        router.post(BASE, QuotesController.createQuote);
        router.get(`${BASE}/ordered`, QuotesController.getQuotesOrdered);
        router.put(`${BASE}/:id`, QuotesController.favSpecificQuote);
    }
}
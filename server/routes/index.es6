"use strict";

import QuotesRoutes from '../api/quotes/routes/routes';
import StaticDispatcher from '../commons/static/index';

export default class Routes
{
   static init(app, router)
   {
     QuotesRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);

     app.use('/', router);
   }
}

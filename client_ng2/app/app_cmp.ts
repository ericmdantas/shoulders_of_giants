/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import {QuotesCmp} from 'quotes/quotes_cmp.js';
import {HTTP_BINDINGS} from 'http/http';

@Component({
  selector: 'app'
})
@View({
  template: `
    <h2>app</h2>
  `
})

export class App {

}

bootstrap(QuotesCmp, [HTTP_BINDINGS]);

/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent, bootstrap} from 'angular2/angular2';
import {QuotesCmp} from 'quotes/quotes_cmp.js';
import {HTTP_BINDINGS} from 'http/http';

@Component({
  selector: 'app',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <h2>app</h2>
  `
})

export class App {
  onInit() {
    console.log('app init');
  }
}

bootstrap(QuotesCmp, [HTTP_BINDINGS]);

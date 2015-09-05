/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent, CORE_DIRECTIVES} from 'angular2/angular2';
import {Inject, forwardRef} from 'angular2/di';
import {Quote} from 'app/quotes/quotes_model.js';
import {QuotesDao} from 'app/quotes/quotes_dao.js';

@Component({
  selector: 'quote-cmp',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <div class="quote-container">
      <p class="quote"></p>
      <span class="author"></span>
    </div>
  `,
  directives: [CORE_DIRECTIVES]
})

export class QuoteCmp {
  constructor(@Inject(Quote) public q: Quote) {

  }

  onInit() {
    console.log('quote-cmp init');
  }
}

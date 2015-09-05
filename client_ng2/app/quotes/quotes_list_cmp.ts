/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, bootstrap, NgFor, LifecycleEvent} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {QuoteCmp, QuoteDao, Quote} from 'app/quotes/quotes.js';

@Component({
  selector: 'quotes-list',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <div id="quotes-list-container">
      <div *ng-for="">

      </div>
    </div>
  `,
  directives: [NgFor, QuoteCmp]
})

export class QuotesListCmp {
    quotes: Quote[] = [];

    constructor(@Inject(QuoteDao) private _qDao: QuoteDao) {

    }

    onInit() {
      console.log('quotes-list init');

      this._qDao
          .get()
          .subscribe(qs => this.quotes = qs);
    }
}

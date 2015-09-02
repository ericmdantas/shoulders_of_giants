/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent, CORE_DIRECTIVES} from 'angular2/angular2';
import {Inject, forwardRef} from 'angular2/di';
import {Quote} from 'app/quotes/quotes_model.js';
import {QuotesDao} from 'app/quotes/quotes_dao.js';

@Component({
  selector: 'quote',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <div>

    </div>
  `,
  directives: [CORE_DIRECTIVES]
})

export class QuotesCmp {
  quotesList: Quote[] = [];

  constructor(@Inject(QuotesDao) private _qDao: QuotesDao) {

  }

  onInit() {
    this._qDao
        .get()
        .subscribe(qs => {
          this.quotesList = qs;
        })
        .dispose();
  }
}

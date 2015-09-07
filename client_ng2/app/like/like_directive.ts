/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, ElementRef} from 'angular2/angular2';
import {QuotesDao} from 'app/quotes/quotes_dao.js';
import {Inject} from 'angular2/di';

@Component({
  selector: 'like',
  properties: ['quoteId', 'likesCount']
})
@View({
  template: `
    <span (click)="likeHandler(quoteId)"></span>
  `
})

export class LikeDirective {
  constructor(@Inject(ElementRef) private _el: ElementRef, @Inject(QuotesDao) private _qDao: QuotesDao) {

  }

  likeHandler(id:string):void {
    this._qDao
        .like(id)
        .subscribe(() => {
            
        })
        .dispose();
  }
}

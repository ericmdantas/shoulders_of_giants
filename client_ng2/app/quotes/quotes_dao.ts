/// <reference path="../../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Http} from 'http/http';

export class QuotesDao {
  static URL_BASE: string = '/api/quotes';

  constructor(private _http: Http) {

  }

  get():EventEmitter {
    return this._http.get(QuotesDao.URL_BASE).toRx();
  }

  add():EventEmitter {
    return this._http.post(QuotesDao.URL_BASE).toRx();
  }

  edit():EventEmitter {
    return this._http.put(QuotesDao.URL_BASE).toRx();
  }
}

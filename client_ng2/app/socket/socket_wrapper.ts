/// <reference path="../,./typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';

export class SocketWrapper {
  private _socket: WebSocket;
  private _ee: EventEmitter = new EventEmitter();

  constructor(private ev: string) {

  }

  listen():Rx.Observable<any> {
    this._socket.on(this.ev, (info:any) => {
      this._ee.next(info);
    });

    return this._ee.toRx();
  }

  dispatch(info:any):void {
    this._socket.emit(this.ev, info);
  }
}

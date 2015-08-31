export class Quote {
  private _author: string;
  private _quote: string;

  constructor(author: string, quote: string) {
    this._author = author;
    this._quote = quote;
  }

  set author(a:string) {
    this._author = a;
  }

  get author():string {
    return this._author;
  }

  set quote(q:string) {
    this._quote = q;
  }

  get quote():string {
    return this._quote;
  }
}

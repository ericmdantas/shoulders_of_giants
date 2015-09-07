export class Quote {
  private _author: string;
  private _quote: string;
  private _likes: number;

  constructor({author, quote, likes}: {author:string, quote:string, likes:number} = {author: '', quote: '', likes: 0}) {
    this._author = author;
    this._quote = quote;
    this._likes = 0;
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

  set likes(l:number) {
    this._likes = l;
  }
}

var Quote = (function () {
    function Quote(author, quote) {
        this._author = author;
        this._quote = quote;
    }
    Object.defineProperty(Quote.prototype, "author", {
        get: function () {
            return this._author;
        },
        set: function (a) {
            this._author = a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quote.prototype, "quote", {
        get: function () {
            return this._quote;
        },
        set: function (q) {
            this._quote = q;
        },
        enumerable: true,
        configurable: true
    });
    return Quote;
})();
exports.Quote = Quote;

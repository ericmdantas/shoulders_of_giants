var Quote = (function () {
    function Quote(_a) {
        var _b = _a === void 0 ? { author: '', quote: '', likes: 0 } : _a, author = _b.author, quote = _b.quote, likes = _b.likes;
        this._author = author;
        this._quote = quote;
        this._likes = 0;
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
    Object.defineProperty(Quote.prototype, "likes", {
        set: function (l) {
            this._likes = l;
        },
        enumerable: true,
        configurable: true
    });
    return Quote;
})();
exports.Quote = Quote;

/// <reference path="../../../typings/tsd.d.ts" />
var QuotesDao = (function () {
    function QuotesDao(_http) {
        this._http = _http;
    }
    QuotesDao.prototype.get = function () {
        return this._http.get(QuotesDao.URL_BASE).toRx();
    };
    QuotesDao.prototype.add = function () {
        return this._http.post(QuotesDao.URL_BASE).toRx();
    };
    QuotesDao.prototype.edit = function () {
        return this._http.put(QuotesDao.URL_BASE).toRx();
    };
    QuotesDao.URL_BASE = '/api/quotes';
    return QuotesDao;
})();
exports.QuotesDao = QuotesDao;

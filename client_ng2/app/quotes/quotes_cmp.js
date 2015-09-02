/// <reference path="../../../typings/tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
var quotes_dao_js_1 = require('app/quotes/quotes_dao.js');
var QuotesCmp = (function () {
    function QuotesCmp(_qDao) {
        this._qDao = _qDao;
        this.quotesList = [];
    }
    QuotesCmp.prototype.onInit = function () {
        var _this = this;
        this._qDao
            .get()
            .subscribe(function (qs) {
            _this.quotesList = qs;
        })
            .dispose();
    };
    QuotesCmp = __decorate([
        angular2_1.Component({
            selector: 'quote',
            lifecycle: [angular2_1.LifecycleEvent.onInit]
        }),
        angular2_1.View({
            template: "\n    <div>\n\n    </div>\n  ",
            directives: [angular2_1.CORE_DIRECTIVES]
        }),
        __param(0, di_1.Inject(quotes_dao_js_1.QuotesDao)), 
        __metadata('design:paramtypes', [(typeof (_a = typeof quotes_dao_js_1.QuotesDao !== 'undefined' && quotes_dao_js_1.QuotesDao) === 'function' && _a) || Object])
    ], QuotesCmp);
    return QuotesCmp;
    var _a;
})();
exports.QuotesCmp = QuotesCmp;

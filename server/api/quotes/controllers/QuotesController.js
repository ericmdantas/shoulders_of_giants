'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Quotes = require('../dao/QuotesDAO');

var _Quotes2 = _interopRequireWildcard(_Quotes);

'use strict';

var QuotesController = (function () {
    function QuotesController() {
        _classCallCheck(this, QuotesController);
    }

    _createClass(QuotesController, null, [{
        key: 'getAllQuotes',
        value: function getAllQuotes(req, res) {
            var _successCallback = function _successCallback(quotes) {
                res.status(200).json(quotes);
            };

            var _errorCallback = function _errorCallback(err) {
                res.status(400).json({ error: err });
            };

            _Quotes2['default'].getQuotes().then(_successCallback)['catch'](_errorCallback).done();
        }
    }, {
        key: 'favSpecificQuote',
        value: function favSpecificQuote(io, id) {
            var quoteId = id;

            var _successCallback = function _successCallback(updated) {
                io.emit('quote:faved', updated);
            };

            var _errorCallback = function _errorCallback(err) {
                io.emit('fav:error', err);
            };

            _Quotes2['default'].favSpecificQuote(quoteId).then(_successCallback)['catch'](_errorCallback).done();
        }
    }, {
        key: 'getQuotesOrdered',
        value: function getQuotesOrdered(req, res) {
            var _order = req.query.sort;

            var _successCallback = function _successCallback(quotes) {
                res.status(200).json(quotes);
            };

            var _errorCallback = function _errorCallback(err) {
                res.status(400).json({ error: 'Houve um erro no momento da ordenação das frases.' });
            };

            _Quotes2['default'].getQuotesOrderedBy(_order).then(_successCallback)['catch'](_errorCallback).done();
        }
    }, {
        key: 'createQuote',
        value: function createQuote(req, res) {
            var _quote = req.body;

            var _onSuccess = function _onSuccess(quote) {
                res.status(200).json(quote);
            };

            var _onError = function _onError(error) {
                res.status(400).json(error);
            };

            _Quotes2['default'].createQuote(_quote).then(_onSuccess)['catch'](_onError).done();
        }
    }]);

    return QuotesController;
})();

exports['default'] = QuotesController;
module.exports = exports['default'];
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
        value: true
});

var _StaticController = require('../controllers/ContentController');

var _StaticController2 = _interopRequireWildcard(_StaticController);

var _QuotesController = require('../controllers/QuotesController');

var _QuotesController2 = _interopRequireWildcard(_QuotesController);

'use strict';

var Routes = (function () {
        function Routes() {
                _classCallCheck(this, Routes);
        }

        _createClass(Routes, null, [{
                key: 'init',
                value: function init(app) {
                        var BASE = '/api/quotes';

                        app.get('/', _StaticController2['default'].sendIndex);

                        app.get(BASE, _QuotesController2['default'].getAllQuotes);
                        app.get(BASE + '/ordered', _QuotesController2['default'].getQuotesOrdered);
                        app.post(BASE, _QuotesController2['default'].createQuote);
                        app.put(BASE + '/:id', _QuotesController2['default'].favSpecificQuote);

                        app.get('/*', _StaticController2['default'].sendIndex);
                }
        }]);

        return Routes;
})();

exports['default'] = Routes;
module.exports = exports['default'];
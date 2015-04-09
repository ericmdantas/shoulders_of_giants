'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _quotesCtrl = require('../controllers/QuotesController');

var _quotesCtrl2 = _interopRequireWildcard(_quotesCtrl);

'use strict';

var SocketEvents = (function () {
    function SocketEvents() {
        _classCallCheck(this, SocketEvents);
    }

    _createClass(SocketEvents, null, [{
        key: 'init',
        value: function init(io) {
            io.on('connection', function (client) {
                client.on('fav:quote', function (id) {
                    _quotesCtrl2['default'].favSpecificQuote(io, id);
                });
            });
        }
    }]);

    return SocketEvents;
})();

exports['default'] = SocketEvents;
module.exports = exports['default'];
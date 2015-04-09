'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireWildcard(_mongoose);

'use strict';

var DBaseConfig = (function () {
    function DBaseConfig() {
        _classCallCheck(this, DBaseConfig);
    }

    _createClass(DBaseConfig, null, [{
        key: 'init',
        value: function init() {
            var URL_BANCO = process.env.NODE_ENV === 'production' ? process.env.MONGOHQ_URL : 'mongodb://localhost/quotes';

            _mongoose2['default'].connect(URL_BANCO);
            var db = _mongoose2['default'].connection;
            db.on('error', console.error.bind(console, 'deu ruim: '));
        }
    }]);

    return DBaseConfig;
})();

exports['default'] = DBaseConfig;
module.exports = exports['default'];
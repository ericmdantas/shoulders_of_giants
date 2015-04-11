'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
        value: true
});
'use strict';

var fs = require('fs');

var StaticController = (function () {
        function StaticController() {
                _classCallCheck(this, StaticController);
        }

        _createClass(StaticController, null, [{
                key: 'sendIndex',
                value: function sendIndex(req, res) {
                        var _root = process.cwd();

                        res.setHeader('Content-Type', 'text/html');

                        var _folder = process.env !== 'production' ? '__tmp' : 'dist';

                        fs.createReadStream(_root + ('/client/' + _folder + '/index.html')).pipe(res);
                }
        }]);

        return StaticController;
})();

exports['default'] = StaticController;
module.exports = exports['default'];
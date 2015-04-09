'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _morgan = require('morgan');

var _morgan2 = _interopRequireWildcard(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireWildcard(_bodyParser);

var _contentLength = require('express-content-length-validator');

var _contentLength2 = _interopRequireWildcard(_contentLength);

'use strict';

var RouteConfigurator = (function () {
    function RouteConfigurator() {
        _classCallCheck(this, RouteConfigurator);
    }

    _createClass(RouteConfigurator, null, [{
        key: 'init',
        value: function init(application, exp, dir) {
            var _root = process.cwd();

            application.use(exp['static'](_root + '/client/dist/'));
            application.use(_bodyParser2['default']());
            application.use(_morgan2['default']('dev'));
            application.use(_contentLength2['default'].validateMax({ max: 666 }));
        }
    }]);

    return RouteConfigurator;
})();

exports['default'] = RouteConfigurator;
module.exports = exports['default'];
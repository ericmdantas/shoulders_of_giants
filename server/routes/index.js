'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _QuotesRoutes = require('../api/quotes/routes/routes');

var _QuotesRoutes2 = _interopRequireWildcard(_QuotesRoutes);

var _StaticDispatcher = require('../commons/static/index');

var _StaticDispatcher2 = _interopRequireWildcard(_StaticDispatcher);

'use strict';

var Routes = (function () {
  function Routes() {
    _classCallCheck(this, Routes);
  }

  _createClass(Routes, null, [{
    key: 'init',
    value: function init(app, router) {
      _QuotesRoutes2['default'].init(router);

      router.route('*').get(_StaticDispatcher2['default'].sendIndex);

      app.use('/', router);
    }
  }]);

  return Routes;
})();

exports['default'] = Routes;
module.exports = exports['default'];
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireWildcard(_mongoose);

var _Promise = require('bluebird');

var _Promise2 = _interopRequireWildcard(_Promise);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _quotesSchema = require('../schemas/quotesSchema');

'use strict';

_quotesSchema.quotesSchema.statics.getQuotes = function () {
    return new _Promise2['default'](function (resolve, reject) {
        var _query = {};
        var _projection = {};

        Quote.find(_query, _projection).sort('quote').exec(function (err, quotes) {
            err ? reject(err) : resolve(quotes);
        });
    });
};

_quotesSchema.quotesSchema.statics.favSpecificQuote = function (id) {
    return new _Promise2['default'](function (resolve, reject) {
        if (!_import2['default'].isString(id)) {
            reject(new Error('Impossível favoritar mensagem. Id deve ser uma string.'));
            return;
        }

        var _query = { _id: id };
        var _updt = { $inc: { likes: 1 }, lastLiked: Date.now() };

        Quote.findOneAndUpdate(_query, _updt).exec(function (err, updated) {
            err ? reject(err) : resolve(updated);
        });
    });
};

_quotesSchema.quotesSchema.statics.getQuotesOrderedBy = function (order) {
    return new _Promise2['default'](function (resolve, reject) {
        if (!_import2['default'].isString(order)) {
            reject(new Error('Não é possível ordenar as frases com o parâmetro passado. Parâmetro order errado.'));
            return;
        }

        var _order = order.toLowerCase();

        var _query = {};
        var _projection = {};

        Quote.find(_query, _projection).sort(_order).exec(function (err, quotes) {
            err ? reject(err) : resolve(quotes);
        });
    });
};

_quotesSchema.quotesSchema.statics.createQuote = function (quote) {
    return new _Promise2['default'](function (resolve, reject) {
        if (!_import2['default'].isObject(quote)) {
            reject(new Error('Não é possível criar uma frase com um objeto vazio.'));
            return;
        }

        var _onSave = function _onSave(error, saved) {
            error ? reject(error) : resolve(saved);
        };

        var _quote = new Quote(quote);

        _quote.save(_onSave);
    });
};

var Quote = _mongoose2['default'].model('Quote', _quotesSchema.quotesSchema);

exports['default'] = Quote;
module.exports = exports['default'];
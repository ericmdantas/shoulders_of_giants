"use strict";

quotesApp.service('QuotesCache', ['$xtorage', function($xtorage)
{
    var QUOTES_KEY = 'q';

    var _saveArray = function(info)
    {
        if (!angular.isArray(info))
            throw new Error('A informação a ser armazenada em cache deve ser um array.');

        $xtorage.save(QUOTES_KEY, info);
    }

    var _getArray = function()
    {
        return $xtorage.get(QUOTES_KEY);
    }

    this.saveArray = _saveArray;
    this.getArray = _getArray;
}]);
"use strict";

(function()
{
    angular
        .module('emd.client.storage.module', [])
        .service('ClientStorageService', ['$window', function($window)
        {
            var _get = function(key)
            {
                var _item = $window.localStorage.getItem(key);

                return angular.fromJson(_item);
            }

            var _save = function(key, info)
            {
                var _info = angular.isObject(info) ? angular.toJson(info) : info;

                $window.localStorage.setItem(key, _info);
            }

            var _remove = function(key)
            {
                $window.localStorage.removeItem(key);
            }

            this.get = _get;
            this.save = _save;
            this.remove = _remove;
        }]);
}());
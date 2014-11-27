"use strict";

(function()
{
    angular
        .module('emd.client.socket.module', [])
        .service('SocketService', ['$rootScope', '$window', function($rootScope, $window)
        {
            var socket = $window.io();

            var _on = function(eventName, callback)
            {
                socket.on(eventName, function()
                {
                    var args = arguments;

                    $rootScope.$apply(function()
                    {
                        callback.apply(socket, args);
                    });
                });
            }

            var _emit = function(eventName, data, callback)
            {
                socket.emit(eventName, data, function()
                {
                    var args = arguments;

                    $rootScope.$apply(function()
                    {
                        if (callback)
                            callback.apply(socket, args);
                    });
                });
            }

            this.on = _on;
            this.emit = _emit;
        }]);
}())
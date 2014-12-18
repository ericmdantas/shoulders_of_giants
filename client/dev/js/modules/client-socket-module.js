"use strict";

(function()
{
    angular
        .module('emd.client.socket.module', ['btford.socket-io'])
        .service('SocketService', ['socketFactory', function(socketFactory)
        {
            return socketFactory();
        }]);
}())
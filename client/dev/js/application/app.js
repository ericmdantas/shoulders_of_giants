var quotesApp = angular.module('quotes', ['ngResource',
                                          'btford.socket-io',
                                          'emd.client.socket.module',
                                          'emd.ng-xtorage']);

quotesApp.config(['$xtorageProvider', function($xtorageProvider)
{
    $xtorageProvider.storage = 'sessionStorage';
    $xtorageProvider.storageExpiration = 21600000; // 6 hours
}])
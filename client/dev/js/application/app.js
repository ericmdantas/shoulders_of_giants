var quotesApp = angular.module('quotes', ['ngResource',
                                          'btford.socket-io',
                                          'emd.client.socket.module',
                                          'emd.ng-xtorage']);

quotesApp.config(['$xtorageProvider', function($xtorageProvider)
{
    $xtorageProvider.storage = 'sessionStorage';
    $xtorageProvider.storageExpiration = 21600000; // 6 hours
}]);

quotesApp.constant('QUOTE_LIKED_KEY', 'q_liked');
quotesApp.constant('VERSION', '0.0.1');

var quotesApp = angular.module('quotes', ['ngResource',
                                          'btford.socket-io',
                                          'emd.client.socket.module',
                                          'emd.ng-xtorage']);

quotesApp.config(['$xtorageDefaultStorageProvider', function($xtorageDefaultStorageProvider)
{
    $xtorageDefaultStorageProvider.storage = 'sessionStorage';
}])
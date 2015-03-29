var quotesApp = angular.module('quotes', ['ngResource',
                                          'ngNewRouter',
                                          'btford.socket-io',
                                          'emd.client.socket.module',
                                          'emd.ng-xtorage']);

quotesApp.config(['$locationProvider', '$xtorageProvider', function($locationProvider, $xtorageProvider)
{
    $locationProvider.html5Mode(true);
    $xtorageProvider.storage = 'sessionStorage';
}]);

quotesApp.constant('QUOTE_LIKED_KEY', 'q_liked');
quotesApp.constant('VERSION', '0.0.1');

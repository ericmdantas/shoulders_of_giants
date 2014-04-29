var quotesApp = angular.module('quotes', ['ngRoute'])
                       .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
                                {
                                    $routeProvider
                                        .when('/', {templateUrl: '../../partials/all.html'})
                                        .when('/best_of', {templateUrl: '../../partials/best_of.html'})
                                        .otherwise({redirect: '/'});

                                    $locationProvider.html5Mode(true);
                                }])


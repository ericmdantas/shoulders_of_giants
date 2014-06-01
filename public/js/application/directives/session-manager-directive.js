"use strict";

quotesApp.directive('sessionManager', ['$window', function($window)
{
    var VISUALIZATION_KEY = 'visualization';
    var ORDER_KEY = 'order';
    var FILTER_KEY = 'filter';

    return function(scope, element, attrs)
    {
        element.on('click', function()
        {
            switch(attrs.sessionManager)
            {
                case "multiple":
                case "single":
                    $window.localStorage.setItem(VISUALIZATION_KEY, attrs.sessionManager);
                    break;

                case "author":
                case "quote":
                case "best":
                    $window.localStorage.setItem(ORDER_KEY, attrs.sessionManager);
                    break;

                case "filter":
                    $window.localStorage.setItem(FILTER_KEY, attrs.sessionManager);
                    break;
            }
        })

        scope.$on('QuotesReady', function()
        {
            var _storageVisualization = $window.localStorage.getItem(VISUALIZATION_KEY);
            var _storageOrder = $window.localStorage.getItem(ORDER_KEY);
            var _storageFilter = $window.localStorage.getItem(FILTER_KEY);

            if (_storageVisualization.toLowerCase() === 'single')
            {
                scope.setSingle(scope.quotes);
                $('#multiple-view').removeClass('active');
                $('#single-view').addClass('active');
            }
        })
    }
}])
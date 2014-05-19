"use strict";

quotesApp.directive('navigation', ['$window', function($window)
{
    var _template = '<nav id="navigation" class="transition text-centered">'+
                        '<div>'+
                            '<h3 class="title" toggle="ul">Order By</h3>'+
                            '<ul>'+
                                  '<li class="transition active" ng-click="setOrder(\'author\')">author</li>'+
                                  '<li class="transition" ng-click="setOrder(\'quote\')">quote</li>'+
                                  '<li class="transition" ng-click="setOrder(\'-likes\')">best of</li>'+
                            '</ul>'+
                        '</div>'+
                     '</nav>';

    var _link = function(scope, element, attrs)
    {
        element.find('#navigation li').on('click', function()
        {
            element.find('#navigation li').removeClass('active');
            element.find(this).addClass('active');
            $window.scrollTo(0, 0);

            scope.quotes = (scope.quotes.length === 1) ? scope.quotesKeeper : scope.quotes;
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])
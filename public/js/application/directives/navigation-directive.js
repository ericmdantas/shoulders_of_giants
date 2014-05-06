"use strict";

quotesApp.directive('navigation', ['$window', function($window)
{
    var _template = '<nav id="navigation" class="transition text-centered">'+
                        '<div>'+
                            '<h3 class="title">Order By</h3>'+
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
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])
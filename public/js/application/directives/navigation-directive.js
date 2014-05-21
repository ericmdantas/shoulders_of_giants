"use strict";

quotesApp.directive('navigation', ['$window', function($window)
{
    var _template = '<nav id="navigation" class="transition text-centered">'+
                        '<div>'+
                            '<h3 class="title" toggle="ul">Order By</h3>'+
                            '<ul>'+
                                  '<li class="transition active" ng-click="setOrder(\'author\')" activable deactive="#navigation li">author</li>'+
                                  '<li class="transition" ng-click="setOrder(\'quote\')" activable deactive="#navigation li">quote</li>'+
                                  '<li class="transition" ng-click="setOrder(\'-likes\')" activable deactive="#navigation li">best of</li>'+
                            '</ul>'+
                        '</div>'+
                     '</nav>';

    var _link = function(scope, element, attrs)
    {
        element.find('#navigation li').on('click', function()
        {
            $window.scrollTo(0, 0);
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])
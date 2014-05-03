"use strict";

quotesApp.directive('navigation', ['$window', function($window)
{
    var _template = '<nav id="navigation" class="transition text-centered">'+
                        '<div>'+
                            '<h3 class="title">Order By</h3>'+
                            '<ul>'+
                                  '<li class="transition" ng-click="setOrder(\'author\')">author</li>'+
                                  '<li class="transition" ng-click="setOrder(\'quote\')">quote</li>'+
                                  '<li class="transition" ng-click="setOrder(\'-likes\')">best of</li>'+
                            '</ul>'+
                        '</div>'+
                     '</nav>';

    var CLICKABLE_ELEMENT = '#navigation li';

    var _link = function(scope, element, attrs)
    {
        $(CLICKABLE_ELEMENT).on('click', function()
        {
            $(CLICKABLE_ELEMENT).removeClass('active');
            $(this).addClass('active');
            $window.scrollTo(0, 0);
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])
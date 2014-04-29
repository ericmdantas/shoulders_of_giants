"use strict";

quotesApp.directive('navigation', [function()
{
    var _template = '<nav id="navigation" class="transition text-centered">'+
                        '<ul>'+
                              '<li class="transition" ng-click="changeOption(\'/\')">all</li>'+
                              '<li class="transition" ng-click="changeOption(\'/most_liked\')">best of</li>'+
                        '</ul>'+
                     '</nav>';

    return {
                restrict: 'E',
                template: _template,
                controller: 'NavController'
           }
}])
"use strict";

quotesApp.directive('filter', ['$window', function($window)
{
    var _template = '<div id="filter" class="transition text-centered">' +
                        '<div>'+
                            '<h3 class="title" toggle="ul">Filter</h3>'+
                            '<ul>'+
                                '<li class="transition">' +
                                    '<input type="text" ng-model="search.quote" class="filter" placeholder="I wanna read about.." maxlength="100"/>' +
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        element.find('#filter .filter').on('focus', function()
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
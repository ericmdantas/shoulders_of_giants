"use strict";

quotesApp.directive('toTheTop', ['$window', function($window)
{
    var _template = '<div id="to-the-top">top</div>';

    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
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
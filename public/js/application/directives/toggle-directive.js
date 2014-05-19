"use strict";

quotesApp.directive('toggle', [function()
{
    var _link = function(scope, element, attrs)
    {
        element.siblings(attrs.toggle).toggle();

        element.on('click', function()
        {
            element.siblings(attrs.toggle).toggle();
        })
    }

    return {
                restrict: 'A',
                link: _link
           }
}])
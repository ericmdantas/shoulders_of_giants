"use strict";

quotesApp.directive('toggle', [function()
{
    var _link = function(scope, element, attrs)
    {
        element.siblings(attrs.toggle).toggle();

        element.on('click', function()
        {
            $('#options ul').fadeOut('slow');
            element.siblings(attrs.toggle).slideToggle();
        })
    }

    return {
                restrict: 'A',
                link: _link
           }
}])
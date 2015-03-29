"use strict";

quotesApp.directive('showOtherOptions', [function()
{
    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            $('.opt').not(element).slideToggle();
            element.find('.fa').toggleClass('fa-minus');
        });
    };

    return _link;
}])
"use strict";

quotesApp.directive('emdBlanket', [function()
{
    var _link = function(scope, element, attrs)
    {
        var ID_BLANKET = 'emd-blanket';
        var ID_OPTIONS = 'emd-options';

        element.on('click', function()
        {
            $("#" + ID_BLANKET).fadeOut('fast');
            $(ID_OPTIONS).fadeOut('fast');
        })
    }

    return _link;
}])
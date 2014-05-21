"use strict";

quotesApp.directive('activable', [function()
{
    return function(scope, element, attrs)
    {
        element.on('click', function()
        {
            var _toDeactive = attrs.deactive;

            if (lib.isStringInvalid(_toDeactive))
                throw new Error('É necessário informar o caminho do element a ser removido a classe active.');

            $(_toDeactive).removeClass('active');
            element.addClass('active');
        })
    }
}])
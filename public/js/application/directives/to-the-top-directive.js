"use strict";

quotesApp.directive('toTheTop', ['$window', function($window)
{
    var _template = '<div id="to-the-top" class="transition"><strong>top</strong></div>';

    var _link = function(scope, element, attrs)
    {
        element.fadeOut('fast');

        element.on('click', function()
        {
            $window.scrollTo(0, 0);
        })

        $($window).on('scroll', function()
        {
            $window.scrollY < 100 ? element.fadeOut('slow') : element.fadeIn('slow');
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])
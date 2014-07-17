"use strict";

quotesApp.directive('contact', ['$window', function($window)
{
    var _template = '<div id="contact" class="text-centered transition">' +
                          '<div>'+
                                '<h3 class="title" toggle="ul">Feedback</h3>'+
                          '</div>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            console.log('sending feedback!');
        })
    }

    return {
        restrict: 'E',
        template: _template,
        link: _link
    }
}])
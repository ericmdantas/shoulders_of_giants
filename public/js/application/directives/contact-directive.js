"use strict";

quotesApp.directive('contact', ['$window', 'author', function($window, author)
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
            $window.location.href = author.github;
        })
    }

    return {
        restrict: 'E',
        template: _template,
        link: _link
    }
}])
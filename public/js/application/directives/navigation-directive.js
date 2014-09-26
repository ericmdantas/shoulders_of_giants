"use strict";

quotesApp.directive('navigation', ['$window', '$rootScope', function($window, $rootScope)
{
    var _template = '<nav id="navigation" class="transition text-centered">'+
                        '<div>'+
                            '<h3 class="title">Order By</h3>'+
                        '</div>'+
                     '</nav>';

    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            var _setOrderAuthor = function()
            {
                scope.setOrder('author');
            }

            var _setOrderQuote = function()
            {
                scope.setOrder('quote');
            }

            var _setOrderLikesDesc = function()
            {
                scope.setOrder('-likes');
            }

            var _obj = {title: 'ORDER BY',
                        content: [{name: 'author',
                                   action: _setOrderAuthor},
                                  {name: 'quote',
                                   action: _setOrderQuote},
                                  {name: 'likes',
                                   action: _setOrderLikesDesc}]};

            $rootScope.$broadcast('emd:build-options', _obj);
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])
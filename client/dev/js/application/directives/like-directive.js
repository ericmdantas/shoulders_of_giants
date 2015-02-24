"use strict";

quotesApp.directive('like', ['$xtorage', function($xtorage)
{
    var _templateUrl = 'partials/includes/likes.html';

    var _link = function(scope, element, attrs)
    {
        scope.star = 'fa-star-o';

        element
            .on('click', function()
            {
                scope.star = 'fa-star';
            });
    }

    return {
                restrict: 'E',
                templateUrl: _templateUrl,
                link: _link,
                scope: {liked: '&', numberlikes: '@', qid: "@"}
           }
}]);
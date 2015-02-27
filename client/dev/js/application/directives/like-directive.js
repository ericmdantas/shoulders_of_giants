"use strict";

quotesApp.directive('like', ['$xtorage', 'QUOTE_LIKED_KEY', function($xtorage, QUOTE_LIKED_KEY)
{
    var _templateUrl = 'partials/includes/likes.html';

    var _link = function(scope, element, attrs)
    {
        scope.quoteLiked = (scope.alreadyLiked === "true");
        scope.star = scope.quoteLiked ? 'fa-star' : 'fa-star-o';

        element
            .on('click', function()
            {
                var _quotesLiked = $xtorage.getFromLocalStorage(QUOTE_LIKED_KEY) || [];

                _quotesLiked.push(scope.qid);

                $xtorage.saveInLocalStorage(QUOTE_LIKED_KEY, _quotesLiked);

                scope.star = 'fa-star';
            });
    }

    return {
                restrict: 'E',
                templateUrl: _templateUrl,
                link: _link,
                scope: {liked: '&', numberlikes: '@', qid: "@", alreadyLiked: "@"}
           }
}]);
"use strict";

quotesApp.directive('like', ['ClientStorageService', function(ClientStorageService)
{
    var _template = '<div class="like-container transition hand" ng-click="liked(id);">' +
                        '<span class="number-likes transition">{{numberlikes}}</span>' +
                        '<span class="icone-star transition fa {{star}}"></span>';
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        scope.star = 'fa-star-o';

        element
            .on('click', function()
            {
                scope.star = 'fa-star';

                ClientStorageService.save('likes', 'a');
            });
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link,
                scope: {liked: '&', numberlikes: '@'}
           }
}]);
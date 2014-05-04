"use strict";

quotesApp.directive('like', function()
{
    var _template = '<div class="like-container transition">' +
                        '<span class="number-likes transition">{{numberlikes}}</span>' +
                        '<img src="../img/star.png" class="like transition" ng-click="liked(id)" title="click to like! :D"/>';
                    '</div>';

    return {
                restrict: 'E',
                template: _template,
                scope: {liked: '&', numberlikes: '@'}
           }
})
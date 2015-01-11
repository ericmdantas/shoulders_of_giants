"use strict";

quotesApp.directive('showModalWhenNoQuotes', ['$rootScope', function($rootScope)
{
    var _templateUrl = 'partials/includes/modal-loading.html';

    var _compile = function()
    {
        var MODAL_ID = '#modal-loading-quotes';

        var _pre = function()
        {
            $(MODAL_ID).modal('show');
        }

        var _post = function()
        {
            var _destroy = $rootScope.$on('quotes-ready', function()
            {
                $(MODAL_ID).modal('hide');
                _destroy();
            });
        }

        return {pre: _pre, post: _post};
    };

    var _scope = {};

    return {
                restrict: 'E',
                templateUrl: _templateUrl,
                compile: _compile,
                scope: _scope
           }
}])
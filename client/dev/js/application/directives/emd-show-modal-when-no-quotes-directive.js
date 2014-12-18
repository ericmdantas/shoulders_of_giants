"use strict";

quotesApp.directive('showModalWhenNoQuotes', [function()
{
    var _templateUrl = 'partials/includes/modal-loading.html';

    var _link = function(scope, element, attrs)
    {
        var MODAL_ID = '#modal-loading-quotes';

        $(MODAL_ID).modal('show');

        var _destroy = scope.$on('quotes-ready', function(event, obj)
        {
            $(MODAL_ID).modal('hide');
            _destroy();
        });
    };

    var _scope = {};

    return {
                restrict: 'E',
                templateUrl: _templateUrl,
                link: _link,
                scope: _scope
           }
}])
"use strict";

quotesApp.controller('QuotesController', ['$scope', '$http', 'QuotesService', function($scope, $http, QuotesService)
{
    $scope.quotes = [];

    $scope.setOrder = function(order)
    {
        if (lib.isStringInvalid(order))
            throw new Error('Ordenação incorreta. O tipo do parâmetro deve ser uma string.');

        $scope.getOrder = order;
    }

    $scope.getQuotes = function()
    {
        QuotesService.getQuotes()
             .success(function(data)
                     {
                        $scope.quotes = (data && data.quotes) ? data.quotes : [];
                     })
    }

    $scope.getQuotes();
    $scope.setOrder('quote');
}])
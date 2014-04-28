"use strict";

quotesApp.controller('QuotesController', ['$scope', '$http', 'QuotesService', function($scope, $http, QuotesService)
{
    $scope.quotes = [];

    $scope.getQuotes = function()
    {
        QuotesService.getQuotes()
             .success(function(data)
                     {
                        $scope.quotes = (data && data.quotes) ? data.quotes : [];
                     })
    }

    $scope.getQuotes();
}])
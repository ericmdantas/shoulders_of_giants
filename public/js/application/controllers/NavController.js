"use strict";

quotesApp.controller('NavController', ['$scope', '$location', function($scope, $location)
{
    $scope.changeOption = function(url)
    {
        if (lib.isStringInvalid(url))
            throw new Error('Opção inválida. Url não é uma string válida.');

        $location.path(url);
    }
}])
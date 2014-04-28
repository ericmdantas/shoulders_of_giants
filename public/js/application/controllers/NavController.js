"use strict";

quotesApp.controller('NavController', ['$scope', function($scope)
{
    var _userOptions = [{name: 'best of', location: '/best_of'}];
    $scope.navigationOptions = _userOptions;
}])
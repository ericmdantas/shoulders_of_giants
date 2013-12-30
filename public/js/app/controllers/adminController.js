function AdminController($scope, $http)
{
    $scope.author = {};
    $scope.addQuote = function(n,q)
    {
        $http.post('/postQuotes/'+n+'/'+q, $scope.author);
        console.log('postaaaaaaang');
    }
}
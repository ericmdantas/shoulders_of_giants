function QuotesController($scope, $http)
{
    $scope.quotes = undefined;

    $http.get('/api/quotes').success(function(data)
                                    {
                                        $scope.quotes = data.quotes;
                                    })
}
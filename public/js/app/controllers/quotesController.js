function QuotesController($scope, $http)
{
    $scope.quotes = undefined;

    $http.get('/getQuotes').success(function(data)
                                    {
                                        $scope.quotes = data.quotes;
                                    })
}
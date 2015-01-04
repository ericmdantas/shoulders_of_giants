"use strict";

quotesApp.directive('emdOptionsNavigation', ['$timeout', function($timeout)
{
    var _templateUrl = 'partials/includes/options-navigation.html';

    var _controller = ['$scope', 'Randomizer', function($scope, Randomizer)
    {
        $scope.modalOptions = {titulo: null, conteudo: []};

        $scope.onViewClick = function()
        {
            $scope.modalOptions = {titulo: 'View',
                                   conteudo: [{nome: 'Single', onClick: function()
                                                               {
                                                                    $scope.setSingle($scope.quotes);
                                                               }},

                                              {nome: 'Multiple', onClick: $scope.setMultiple}]};
        }

        $scope.onOrderByClick = function()
        {
            $scope.modalOptions = {titulo: 'Order By',
                                   conteudo: [{nome: 'Quote', onClick: function(){$scope.getOrder = 'quotes';}},
                                              {nome: 'Author', onClick: function(){$scope.getOrder = 'author';}},
                                              {nome: 'Most liked', onClick: function(){$scope.getOrder = '-likes';}}]};
        }

        $scope.onShuffleClick = function()
        {
            $scope.getOrder = null;
            Randomizer.shuffle($scope.quotes);
        }
    }];

    var _link = function(scope, element, attrs)
    {
        scope.$watch('modalOptions', function()
        {
            $timeout(function()
            {
                switch(scope.modalOptions.conteudo.length)
                {
                    case 2: $('.modal-body .btn-group .btn').addClass('col-xs-6');
                        break;

                    case 3: $('.modal-body .btn-group .btn').addClass('col-xs-4');
                        break;
                }
            }, 3);
        });
    }

    return {
                restrict: 'E',
                templateUrl: _templateUrl,
                controller: _controller,
                link: _link
           }
}])
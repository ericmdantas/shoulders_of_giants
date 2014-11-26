"use strict";

quotesApp.directive('emdOptionsNavigation', [function()
{
    var _template = '<div id="options" aling="center" class="transition">'+
                        '<div class="opt not-selectable" data-toggle="modal" data-target="#myModal">' +
                            '<h3 class="title hand" ng-click="onViewClick()">View</h3>'+
                        '</div>'+

                        '<div class="opt not-selectable" data-toggle="modal" data-target="#myModal">' +
                            '<h3 class="title hand" ng-click="onOrderByClick()">Order By</h3>'+
                        '</div>'+

                        '<div class="opt not-selectable">' +
                            '<h3 class="title hand" ng-click="onShuffleClick()">Shuffle</h3>'+
                        '</div>'+

                        '<div id="configuration" class="title visible-lg">Options</div>'+
                    '</div>';

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
            if (scope.modalOptions.conteudo.length === 2)
            {
                $('.modal-body button').addClass('col-sm-6');
            }

            if (scope.modalOptions.conteudo.length === 3)
            {

                $('.modal-body button').addClass('col-sm-4');
            }
        });
    }

    return {
                restrict: 'E',
                template: _template,
                controller: _controller,
                link: _link
           }
}])
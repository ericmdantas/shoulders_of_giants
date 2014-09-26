"use strict";

quotesApp.directive('typeOfVisualization', ['$rootScope', function($rootScope)
{
    var _template = '<div id="type-of-visualization" class="text-centered transition">' +
                        '<div>'+
                            '<h3 class="title">View</h3>'+
                        '</div>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        scope.singleView = false;

        element.on('click', function()
        {
            var _setSingle = function()
            {
                scope.singleView = true;
                scope.setSingle(scope.quotes);
            }

            var _setMultiple = function()
            {
                scope.singleView = false;
                scope.setMultiple();
            }

            var _obj = {title: 'TYPE OF VISUALIZATION',
                        content: [{name: 'single',
                                   action: _setSingle},
                                  {name: 'multiple',
                                   action: _setMultiple}]};

            $rootScope.$broadcast('emd:build-options', _obj);
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])
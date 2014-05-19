"use strict";

quotesApp.directive('typeOfVisualization', function()
{
    var _template = '<div id="type-of-visualization" class="text-centered transition">' +
                        '<div>'+
                            '<h3 class="title" toggle="ul">Visualization</h3>'+
                            '<ul>'+
                                '<li class="transition active" id="multiple-view" ng-click="setMultiple()">multiple</li>'+
                                '<li class="transition" id="single-view" ng-click="setSingle(quotes)">single</li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        scope.singleView = false;

        element.find('#type-of-visualization li').on('click', function()
        {
            element.find('#type-of-visualization li').removeClass('active');
            element.find(this).addClass('active');
        })

        element.find('#multiple-view').on('click', function()
        {
            scope.$apply(function()
            {
                scope.singleView = false;
            })
        })

        element.find('#single-view').on('click', function()
        {
            scope.$apply(function()
            {
                scope.singleView = true;
            })
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
})
"use strict";

quotesApp.directive('typeOfVisualization', function()
{
    var _template = '<div id="type-of-visualization" class="text-centered transition">' +
                        '<div>'+
                            '<h3 class="title" toggle="ul">View</h3>'+
                            '<ul>'+
                                '<li class="transition active" ' +
                                    'id="multiple-view" ' +
                                    'ng-click="setMultiple()" activable deactive="#type-of-visualization li">multiple' +
                                '</li>'+

                                '<li class="transition" ' +
                                     'id="single-view" ' +
                                     'ng-click="setSingle(quotes)" activable deactive="#type-of-visualization li">single' +
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        scope.singleView = false;

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
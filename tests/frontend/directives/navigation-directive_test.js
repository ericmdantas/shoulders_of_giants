"use strict";

describe('navigation-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<nav id="navigation" class="transition text-centered">'+
                        '<div>'+
                            '<h3 class="title">Order By</h3>'+
                            '<ul>'+
                                '<li class="transition" ng-click="setOrder(\'author\')">author</li>'+
                                '<li class="transition" ng-click="setOrder(\'quote\')">quote</li>'+
                                '<li class="transition" ng-click="setOrder(\'-likes\')">best of</li>'+
                            '</ul>'+
                        '</div>'+
                    '</nav>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('should have element defined', function()
        {
            expect(_element).toBeDefined();
        })

        //TODO: ADD MORE TESTS
    })
})
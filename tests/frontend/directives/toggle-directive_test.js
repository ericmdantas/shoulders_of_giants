"use strict";

describe('toggle-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<div toggle=".title"><div class="title">oi</div></div>';

        _element = angular.element(_html);

        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('check elements creation', function()
    {
        it('should have element created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('clicking should be working', function()
    {
        it('should click correctly', function()
        {
            _element.click();
        })
    })
})
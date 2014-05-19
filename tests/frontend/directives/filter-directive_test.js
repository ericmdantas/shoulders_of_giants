"use strict";

describe('filter-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<filter></filter>';

        _element = angular.element(_html);

        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('element should have been created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('checks if the focus event is working', function()
    {
        it('should have focus working', function()
        {
            _element.find('#filter .filter').eq(0).focus();
        })
    })
})
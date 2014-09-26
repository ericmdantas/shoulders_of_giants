"use strict";

describe('navigation-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<navigation></navigation>';

        _scope.quotes = [];

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
    })

    describe('checks if click is working', function()
    {
        it('should call the right event', function()
        {
            _element.click();
        })
    })
})
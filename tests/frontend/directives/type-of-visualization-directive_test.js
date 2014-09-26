"use strict";

describe('type-of-visualization-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<type-of-visualization></type-of-visualization>';

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

        it('should have single view set false', function()
        {
            expect(_element.scope().singleView).toBeFalsy();
        })
    })

    describe('multiple-view', function()
    {
        it('should have singleView set false when clicked', function()
        {
            _element.find('#multiple-view').click();
            expect(_element.scope().singleView).toBeFalsy();
        })
    })

    describe('single-view', function()
    {
        it('should have singleView set true when clicked', function()
        {
            _element.click();
        })
    })
})
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

        it('should have the first li active', function()
        {
            expect(_element.find('li').eq(0).hasClass('active')).toBeTruthy();
        })

        it('should not have the second li active', function()
        {
            expect(_element.find('li').eq(1).hasClass('active')).toBeFalsy();
        })
    })

    describe('checks if lis are being activated when clicked', function()
    {
        it('should have the first li active when clicked', function()
        {
            _element.find('li').eq(0).click();
            expect(_element.find('li').eq(0).hasClass('active')).toBeTruthy();
            expect(_element.find('li').eq(1).hasClass('active')).toBeFalsy();
        })

        /*

        //TODO: CHECK HOW TO TEST THIS, SINCE IT WAS CREATED THE DIRECTIVE ACTIVABLE

        it('should have the second li active when clicked', function()
        {
            _element.find('li').eq(1).click();

            expect(_element.find('li').eq(0).hasClass('active')).toBeFalsy();
            expect(_element.find('li').eq(1).hasClass('active')).toBeTruthy();
        })*/
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
            _element.find('#single-view').click();
            expect(_element.scope().singleView).toBeTruthy();
        })
    })
})
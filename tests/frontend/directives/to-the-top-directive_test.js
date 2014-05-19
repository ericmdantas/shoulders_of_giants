"use strict";

describe('toTheTop', function()
{
    var _scope, _element, _compile, _windowMock;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _windowMock = $injector.get('$window');

        var _html = '<to-the-top></to-the-top>';

        _element = angular.element(_html);
        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('element should exist', function()
        {
            expect(_element).toBeDefined();
        })

        it('should have the sayings \'top\'', function()
        {
            expect(_element.text()).toEqual('top');
        })

        it('should have id to-the-top', function()
        {
            expect(_element.find('div').attr('id')).toEqual('to-the-top');
        })
    })

    describe('checks if the click is working', function()
    {
        it('should display a message', function()
        {
            _element.click();
        })
    })
})
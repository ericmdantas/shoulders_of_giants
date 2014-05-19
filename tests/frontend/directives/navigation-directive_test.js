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

        it('should have three elements', function()
        {
            var _length = _element.find('#navigation li').length;
            expect(_length).toEqual(3);
        })

        it('checks if the options match', function()
        {
            expect(_element.find('#navigation div ul li').eq(0).text()).toEqual('author');
            expect(_element.find('#navigation div ul li').eq(1).text()).toEqual('quote');
            expect(_element.find('#navigation div ul li').eq(2).text()).toEqual('best of');
        })

        it('should have active class only in the first navigation li', function()
        {
            var _listedItems = _element.find('#navigation li');

            expect(_listedItems.eq(0).hasClass('active')).toBeTruthy();
            expect(_listedItems.eq(1).hasClass('active')).toBeFalsy();
            expect(_listedItems.eq(2).hasClass('active')).toBeFalsy();
        })
    })

    describe('checks if click is working', function()
    {
        it('should check if the click on navigation li is working - first li click', function()
        {
            var listedItems = _element.find('#navigation li');
            listedItems.eq(0).click();

            expect(listedItems.eq(0).hasClass('active')).toBeTruthy();
            expect(listedItems.eq(1).hasClass('active')).toBeFalsy();
            expect(listedItems.eq(2).hasClass('active')).toBeFalsy();
        })

        it('should check if the click on navigation li is working - second li click', function()
        {
            var listedItems = _element.find('#navigation li');
            listedItems.eq(1).click();

            expect(listedItems.eq(0).hasClass('active')).toBeFalsy();
            expect(listedItems.eq(1).hasClass('active')).toBeTruthy();
            expect(listedItems.eq(2).hasClass('active')).toBeFalsy();
        })

        it('should check if the click on navigation li is working - third li click', function()
        {
             var listedItems = _element.find('#navigation li');
             listedItems.eq(2).click();

             expect(listedItems.eq(0).hasClass('active')).toBeFalsy();
             expect(listedItems.eq(1).hasClass('active')).toBeFalsy();
             expect(listedItems.eq(2).hasClass('active')).toBeTruthy();
        })
    })
})
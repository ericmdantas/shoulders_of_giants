"use strict";

describe('like-directive', function()
{
    var _scope, _element, _compile, _xtorage;

    beforeEach(module('quotes'));
    beforeEach(module('my.includes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _xtorage = $injector.get('$xtorage');

        var _html = '<like qid="123" ng-click="abc()"></like>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('should check if element was created', function()
        {
            expect(_element).toBeDefined();
        })

        it('should have the right class for the icon', function()
        {
            expect(_element.isolateScope().star).toEqual('fa-star-o');
        })

        it('should have the right class for the icon - liked', function()
        {
            var _html = '<like qid="123" already-liked="true"></like>';

            _element = angular.element(_html);

            _compile(_element)(_scope);
            _scope.$digest();

            expect(_element.isolateScope().star).toEqual('fa-star');
        })
    })

    describe('onClick', function()
    {
        it('should change the class to fa-star', function()
        {
            spyOn(_xtorage, 'pushIntoLocalStorage').and.callFake(angular.noop);

            _element.click();

            expect(_element.isolateScope().star).toEqual('fa-star');
            expect(_xtorage.pushIntoLocalStorage).toHaveBeenCalledWith('q_liked', '123');
        })
    })
})
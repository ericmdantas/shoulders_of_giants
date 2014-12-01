"use strict";

describe('like-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));
    beforeEach(module('my.includes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<like></like>';

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
    })

    describe('onClick', function()
    {
        it('should change the class to fa-star', function()
        {
            _element.click();

            expect(_element.isolateScope().star).toEqual('fa-star');
        })
    })
})
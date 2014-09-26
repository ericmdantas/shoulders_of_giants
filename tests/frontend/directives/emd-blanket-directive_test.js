"use strict";

describe('emd-blanket-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<div emd-blanket class="hidden"></div>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
        _scope.$apply();
    }))

    describe('creation', function()
    {
        it('should have element created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('hide', function()
    {
        it('should add class hidden', function()
        {
            expect(_element.hasClass('hidden')).toBeTruthy();

            _element.click();

            setTimeout(function()
            {
                expect(_element.attr('style').match('none')).toBeTruthy();
            }, 1000);
        })
    })

    describe('emd:go-blanket', function()
    {
        it('should get the event', function()
        {
            _scope.$broadcast('emd:go-blanket');
        })
    })
})
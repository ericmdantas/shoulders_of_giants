"use strict";

describe('emd-options-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<emd-options></emd-options>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('creation', function()
    {
        it('should have element created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('click event', function()
    {
        it('should call the right event', function()
        {
            spyOn(_scope, '$broadcast').andCallThrough();
            spyOn(_scope, '$on').andCallThrough();

            _scope.$broadcast('emd:build-options', {title: 'A', content: [{name: 'A', action: function(){}}]});
            _element.find('button').click();
        })
    })
})
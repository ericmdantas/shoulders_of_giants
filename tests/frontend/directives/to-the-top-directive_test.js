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

        var _html = '<div id="to-the-top" style="height: 1000px;">top</div>';

        _element = angular.element(_html);
        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('click', function()
    {
        it('should redirect the page to the top', function()
        {

        })
    })
})
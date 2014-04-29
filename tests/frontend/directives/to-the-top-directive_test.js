"use strict";

describe('toTheTop', function()
{
    var scope, element, compile, windowMock;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        compile = $injector.get('$compile');
        windowMock = $injector.get('$window');

        var _html = '<div id="to-the-top" style="height: 1000px;">top</div>';

        element = compile(angular.element(_html))(scope);
        scope.$digest();
    }))

    describe('click', function()
    {
        it('should redirect the page to the top', function()
        {

        })
    })
})
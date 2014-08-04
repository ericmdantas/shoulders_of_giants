"use strict";

describe('contact-directive', function()
{
    var _scope, _element, _compile, _windowMock;

    beforeEach(module('quotes', function($provide)
    {
        $provide.constant('$window', {location: {href: null}});
    }));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _windowMock = $injector.get('$window');

        var _html = '<contact></contact>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('should have element created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('should redirect to github', function()
    {
        it('should activate the feedback/contact on click', function()
        {
            _element.click();

            expect(_windowMock.location.href).toEqual('https://github.com/ericmdantas');
        })
    })
})
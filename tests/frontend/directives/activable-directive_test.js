"use strict";

describe('activable-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<div id="a123">' +
                        '<span activable deactive="a123"></span>'+
                    '</div>';

        _element = angular.element(_html);
        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if element was created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('checks if functionality is working on click', function()
    {
        it('should throw error - no param on deactive', function()
        {
            _element = angular.element('<div id="a123">' +
                                            '<span activable deactive></span>'+
                                        '</div>');

            _compile(_element)(_scope);
            _scope.$digest();

            expect(function()
            {
                _element.find('span').eq(0).click();
            }).toThrow(new Error('É necessário informar o caminho do element a ser removido a classe active.'));
        })

        it('should add the class active to the element when clicked', function()
        {
            _element.find('span').eq(0).click();

            expect(_element.find('span').hasClass('active')).toBeTruthy();
        })
    })
})
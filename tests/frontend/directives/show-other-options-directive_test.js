"use strict";

describe('show-other-options-directive', function()
{
    var _scope, _compile, _element;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<div class="opt" style="display: none;"><span class="fa fa-plus"></span></div>' +
                    '<div class="opt" show-other-options><span class="fa fa-plus"></span></div>';

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

    describe('click', function()
    {
        it('should call the right methods', function()
        {
            spyOn($.fn, 'not').and.callThrough();
            spyOn($.fn, 'slideToggle').and.callThrough();
            spyOn($.fn, 'toggleClass').and.callThrough();

            _element.click();

            expect($('.opt').not).toHaveBeenCalled();
            expect($('.opt').slideToggle).toHaveBeenCalled();
            expect($('.opt').toggleClass).toHaveBeenCalledWith('fa-minus');
        })
    })
})
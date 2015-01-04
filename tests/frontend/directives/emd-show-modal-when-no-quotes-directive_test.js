"use strict";

describe('emd-show-modal-when-no-quotes-directive', function()
{
    var _scope, _compile, _element, _windowMock;
    var _MODAL_ID = '#modal-loading-quotes';
    var _htmlPath = 'my.includes';

    beforeEach(module('quotes'));
    beforeEach(module(_htmlPath));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _windowMock = $injector.get('$window');

        var _html = '<show-modal-when-no-quotes></show-modal-when-no-quotes>';

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

    describe('showing the modal', function()
    {
        it('should call the modal hiding right away', function()
        {
            spyOn(_windowMock, '$').and.callThrough();

            var _html = '<show-modal-when-no-quotes></show-modal-when-no-quotes>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            expect(_windowMock.$).toHaveBeenCalledWith(_MODAL_ID);
        })

        /*it('should call the modal hiding right away - show', function()
        {
            spyOn(_windowMock.$(_MODAL_ID), 'modal').andCallFake(angular.noop);

            var _html = '<show-modal-when-no-quotes></show-modal-when-no-quotes>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            expect(_windowMock.$(_MODAL_ID).modal).toHaveBeenCalledWith('show');
        })*/

        it('should react to the quotes-ready event', function()
        {
            spyOn(_scope, '$broadcast').and.callThrough();

            _scope.$broadcast('quotes-ready');
        })
    })
})
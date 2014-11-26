"use strict";

describe('emd-options-navigation-directive', function()
{
    var _scope, _element, _compile, _timeoutMock, _Randomizer;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _timeoutMock = $injector.get('$timeout');
        _Randomizer = $injector.get('Randomizer');

        var _html = '<emd-options-navigation></emd-options-navigation>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('creation', function()
    {
        it('should have element created and accessible', function()
        {

            expect(_element).toBeDefined();
            expect(_element.scope()).toBeDefined();
        })

        it('should have the right init for the scope modalOptions', function()
        {
            expect(_scope.modalOptions.titulo).toBeNull();
            expect(_scope.modalOptions.conteudo.length).toEqual(0);
        })

        it('should have the ids for the right options', function()
        {
            var _opts = _element.find('.opt');

            _timeoutMock.flush(100);

            expect(_opts.eq(0)).toBeDefined();
            expect(_opts.eq(1)).toBeDefined();
            expect(_opts.eq(2)).toBeDefined();
        })

        it('should have the right attrs for the right options', function()
        {
            var _opts = _element.find('.opt');

            _timeoutMock.flush(100);

            for (var i = 0; i < _opts.length; i++)
            {
                if ("shuffle" !== _opts.eq(i).text().toLowerCase())
                {
                    expect(_opts.eq(i).attr('data-toggle')).toEqual('modal');
                    expect(_opts.eq(i).attr('data-target')).toEqual('#myModal');
                }
                else
                {
                    expect(_opts.eq(i).attr('data-toggle')).toBeUndefined();
                    expect(_opts.eq(i).attr('data-target')).toBeUndefined();
                }
            }
        })
    })

    describe('onEventView', function()
    {
        it('should change the scope.modalOptions correctly', function()
        {
            _element.scope().onViewClick();

            expect(_element.scope().modalOptions.titulo).toEqual('View');
        })
    })

    describe('onOrderBy', function()
    {
        it('should change the scope.modalOptions correctly', function()
        {
            _element.scope().onOrderByClick();
            expect(_element.scope().modalOptions.titulo).toEqual('Order By');
        })
    })

    describe('onShuffle', function()
    {
        it('should change the scope.quotes array correctly', function()
        {
            _scope.quotes = [{a: 1, b: 2, c: 3, d: 4, e: 5}];

            spyOn(_Randomizer, 'shuffle').andCallFake(angular.noop);

            _element.scope().onShuffleClick();

            expect(_scope.getOrder).toBeNull();

            expect(_Randomizer.shuffle).toHaveBeenCalledWith(_scope.quotes);
        })
    })
})
"use strict";

describe('QuotesCache', function()
{
    var _QuotesCache, _xtorage, _windowMock;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _windowMock = $injector.get('$window');

        _xtorage = $injector.get('$xtorage');
        _QuotesCache = $injector.get('QuotesCache');
    }))

    afterEach(function()
    {
        _windowMock.sessionStorage.clear();
        _windowMock.localStorage.clear();
    })

    describe('get', function()
    {
        it('should call the right method from $xtorage', function()
        {
            spyOn(_xtorage, 'get').and.callFake(angular.noop);

            _QuotesCache.getArray();

            expect(_xtorage.get).toHaveBeenCalledWith('q');
        })
    })

    describe('save', function()
    {
        it('deve dar um erro, informação passada não é um array', function()
        {
            spyOn(_xtorage, 'save').and.callFake(angular.noop);

            expect(function()
            {
                _QuotesCache.saveArray('abc');
            }).toThrow(new Error('A informação a ser armazenada em cache deve ser um array.'));

            expect(_xtorage.save).not.toHaveBeenCalled();
        })

        it('deve chamar o método já passando os parâmetros corretos', function()
        {
            spyOn(_xtorage, 'save').and.callFake(angular.noop);

            var _quote = [{author: 'a', quote: 'b', likes: 'c', _id: 'abc123'}]

            _QuotesCache.saveArray(_quote);

            expect(_xtorage.save).toHaveBeenCalledWith('q', _quote);
        })
    })
})
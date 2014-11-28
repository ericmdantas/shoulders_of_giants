"use strict";

describe('QuotesDAO', function()
{
    var _QuotesDAO, _httpMock, _SocketService;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _QuotesDAO = $injector.get('QuotesDAO');
        _SocketService = $injector.get('SocketService');
    }))

    describe('getAll', function()
    {
        it('should fetch request correctly', function()
        {
            _httpMock.expectGET('/api/quotes').respond();
            _QuotesDAO.getAll();
            _httpMock.flush();
        })
    })

    describe('favQuote', function()
    {
        it('should throw and error - wrong id param', function()
        {
            var _wrongParam = [null, undefined, true, false, function(){}, 1, 0, {}, []];

            for (var i = 0; i < _wrongParam.length; i++)
            {
                expect(function()
                {
                    _QuotesDAO.favQuote(_wrongParam[i]);
                }).toThrow(new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem.'));
            }
        })

        it('should fetch like correctly', function()
        {
            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            _httpMock.expectPUT('/api/quotes/a123').respond();
            var _id = 'a123';

            _QuotesDAO.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        })
    })
})
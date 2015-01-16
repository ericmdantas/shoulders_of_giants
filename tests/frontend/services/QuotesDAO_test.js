"use strict";

describe('QuotesDAO', function()
{
    var _QuotesDAO, _QuoteModel, _httpMock, _SocketService;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');

        _QuotesDAO = $injector.get('QuotesDAO');
        _QuoteModel = $injector.get('QuotesModel');
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
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

            _httpMock.expectPUT('/api/quotes/a123').respond();
            var _id = 'a123';

            _QuotesDAO.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        })
    })

    describe('createQuote', function()
    {
        it('should not create the quote, null', function()
        {
            var _quote = null;

            var _onSuccess = function()
            {
                expect(true).toBeFalsy(); // should not come here
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
            }

            _QuotesDAO
                .createQuote(_quote)
                .then(_onSuccess, _onError);
        })

        it('should not create the quote, empty object - not an instance of Quote', function()
        {
            var _quote = {};

            var _onSuccess = function()
            {
                expect(true).toBeFalsy(); // should not come here
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
            }

            _QuotesDAO
                .createQuote(_quote)
                .then(_onSuccess, _onError);
        })

        it('should not create the quote, quote missing', function()
        {
            var _quote = {author: 'eric'};

            var _onSuccess = function()
            {
                expect(true).toBeFalsy(); // should not come here
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
            }

            _QuotesDAO
                .createQuote(_quote)
                .then(_onSuccess, _onError);
        })

        it('should not create the quote, author missing', function()
        {
            var _quote = {quote: 'abcdef'};

            var _onSuccess = function()
            {
                expect(true).toBeFalsy(); // should not come here
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
            }

            _QuotesDAO
                .createQuote(_quote)
                .then(_onSuccess, _onError);
        })

        it('should create the quote correctly - but server returns error', function()
        {
            var _quote = new _QuoteModel({author: 'eric', quote: 'abcdef'});

            _httpMock.expectPOST('/api/quotes', _quote).respond(400, {error: 'some error'});

            var _onSuccess = function()
            {
                expect(true).toBeFalsy(); // should not come here
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.status).toBe(400);
                expect(error.msg).toBe("some error");
            }

            _QuotesDAO
                .createQuote(_quote)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        it('should create the quote correctly - server ok', function()
        {
            var _responsePOST = {author: 'eric', quote: 'abcdef', _id: "123", likes: 0};

            var _quote = new _QuoteModel({author: 'eric', quote: 'abcdef'});

            _httpMock.expectPOST('/api/quotes', _quote).respond(200, _responsePOST);

            var _onSuccess = function(quote)
            {
                expect(quote instanceof _QuoteModel).toBeTruthy();
                expect(angular.equals(quote, _responsePOST)).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(false).toBeTruthy(); // should not come here
            }

            _QuotesDAO
                .createQuote(_quote)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        it('should not save quotes with quotation marks', function()
        {
            var _responsePOST = {author: 'eric', quote: 'abcdef', _id: "123", likes: 0};

            var _quote = new _QuoteModel({author: 'eric', quote: '"abcdef"'});

            _quote.quote = 'abcdef';

            _httpMock.expectPOST('/api/quotes', _quote).respond(200, _responsePOST);

            var _onSuccess = function(quote)
            {
                expect(quote instanceof _QuoteModel).toBeTruthy();
                expect(angular.equals(quote, _responsePOST)).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(false).toBeTruthy(); // should not come here
            }

            _QuotesDAO
                .createQuote(_quote)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })
    })
})
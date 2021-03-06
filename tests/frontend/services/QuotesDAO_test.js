"use strict";

describe('QuotesDAO', function()
{
    var _rootScope, _QuotesDAO, _QuoteModel, _httpMock, _SocketService, _QuotesCache, _xtorage;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _rootScope = $injector.get('$rootScope');
        _httpMock = $injector.get('$httpBackend');
        _QuotesCache = $injector.get('QuotesCache');

        _QuotesDAO = $injector.get('QuotesDAO');
        _QuoteModel = $injector.get('QuotesModel');
        _SocketService = $injector.get('SocketService');
        _xtorage = $injector.get('$xtorage');
    }))

    describe('getAll', function()
    {
        it('should fetch request correctly', function()
        {
            spyOn(_QuotesCache, 'getArray').and.callFake(angular.noop);

            _httpMock.expectGET('/api/quotes').respond();
            _QuotesDAO.getAll();
            _httpMock.flush();
        })

        it('should parse the object from the server and add the alreadyLiked prop', function()
        {
            spyOn(_xtorage, 'getFromLocalStorage').and.returnValue(["123"]);

            var _serverResponse = [{quote: "abc", author: "eu", _id: "123"}];

            _httpMock.expectGET('/api/quotes').respond(_serverResponse);

            var _onSuccess = function(quotes)
            {
                expect(quotes).toBeDefined();
                expect(quotes.length).toBe(1);
                expect(quotes[0].alreadyLiked).toBeTruthy();
            }

            var _onError = function()
            {
                expect(true).toBeFalsy();
            }

            _QuotesDAO
                .getAll()
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        it('should parse the object from the server and add the alreadyLiked prop - only the second one', function()
        {
            spyOn(_xtorage, 'getFromLocalStorage').and.returnValue(["321"]);

            var _serverResponse = [{quote: "abc", author: "eu", _id: "123"}, {quote: "abc", author: "eu", _id: "321"}];

            _httpMock.expectGET('/api/quotes').respond(_serverResponse);

            var _onSuccess = function(quotes)
            {
                expect(quotes).toBeDefined();
                expect(quotes.length).toBe(2);
                expect(quotes[0].alreadyLiked).toBeUndefined();
                expect(quotes[1].alreadyLiked).toBeTruthy();
            }

            var _onError = function()
            {
                expect(true).toBeFalsy();
            }

            _QuotesDAO
                .getAll()
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        /*

        TODO: uncomment this when the logic behind expiration is good enough

        it('should get from the storage', function()
        {
            spyOn(_QuotesCache, 'getArray').and.callThrough();

            var _fromStorage = [{author: 'a', quote: 'b', likes: 1, _id: '1'}];

            _xtorage.save('q', _fromStorage);

            var _onSuccess = function(quotes)
            {
                expect(quotes).toEqual(_fromStorage);
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _QuotesDAO
                .getAll()
                .then(_onSuccess, _onError);

            _rootScope.$digest();
        })*/

    })

    describe('favQuote', function()
    {
        beforeEach(function()
        {
            spyOn(_QuotesCache, 'getArray').and.callFake(angular.noop);
        })

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
                .then(_onSuccess)
                .catch(_onError);
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
                .then(_onSuccess)
                .catch(_onError);
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
                .then(_onSuccess)
                .catch(_onError);
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
                .then(_onSuccess)
                .catch(_onError);
        })

        it('should try to create the quote, but server returns error', function()
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
                .then(_onSuccess)
                .catch(_onError);

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
                .then(_onSuccess)
                .catch(_onError);

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
                .then(_onSuccess)
                .catch(_onError);

            _httpMock.flush();
        })
    })
})
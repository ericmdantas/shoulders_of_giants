"use strict";

describe('QuotesController', function()
{
    var _rootScope, _scope, _httpMock, _timeoutMock, _SocketService, _QuotesDAO, _SocketService, _QuotesModel, _xtorage, Randomizer;
    var CONTROLLER_NAME = 'QuoteController as quoteCtrl';

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _rootScope = $injector.get('$rootScope');
        _scope = _rootScope.$new();
        _httpMock = $injector.get('$httpBackend');
        _timeoutMock = $injector.get('$timeout');
        _SocketService = $injector.get('SocketService');
        _xtorage = $injector.get('$xtorage');

        _QuotesDAO = $injector.get('QuotesDAO');
        _QuotesModel = $injector.get('QuotesModel');
        Randomizer = $injector.get('Randomizer');

        spyOn(_xtorage, 'save').and.callFake(angular.noop);
        spyOn(_xtorage, 'get').and.returnValue(null);
    }))

    describe('creation', function()
    {
        it('should create the controller with the right props on scope', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(angular.equals(_scope.quoteCtrl.quotes, [])).toBeTruthy();
            expect(angular.equals(_scope.quoteCtrl.quotesKeeper, [])).toBeTruthy();
            expect(_scope.quoteCtrl.quoteInstance instanceof _QuotesModel).toBeTruthy();
        }))
    })

    describe('getQuotes', function()
    {
        it('should fetch request correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond();
            $controller(CONTROLLER_NAME, {$scope: _scope});
            _httpMock.flush();
        }))

        it('should save the response from the server - empty', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond()
            $controller(CONTROLLER_NAME, {$scope: _scope});
            _httpMock.flush();
            expect(_scope.quoteCtrl.quotes.length).toEqual(0);
            expect(_scope.quoteCtrl.quotesKeeper.length).toEqual(0);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond([])
            $controller(CONTROLLER_NAME, {$scope: _scope});
            _httpMock.flush();
            expect(_scope.quoteCtrl.quotes.length).toEqual(0);
            expect(_scope.quoteCtrl.quotesKeeper.length).toEqual(0);
        }))

        it('should save the response from the server', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond([{author: "Eric", quote: "Alo", likes: 0}]);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            expect(_scope.quoteCtrl.quotes.length).toEqual(1);
            expect(_scope.quoteCtrl.quotesKeeper.length).toEqual(1);
            expect(_scope.quoteCtrl.quotes[0].author).toEqual("Eric");
            expect(_scope.quoteCtrl.quotes[0].quote).toEqual("Alo");
            expect(_scope.quoteCtrl.quotes[0].likes).toEqual(0);

            expect(_scope.quoteCtrl.quotesKeeper[0].author).toEqual("Eric");
            expect(_scope.quoteCtrl.quotesKeeper[0].quote).toEqual("Alo");
            expect(_scope.quoteCtrl.quotesKeeper[0].likes).toEqual(0);
        }))
    })

    describe('order', function()
    {
        it('order should be author', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(_scope.quoteCtrl.order).toEqual('author');
        }))

        it('should change order', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.quoteCtrl.setOrder('someKindOfOrder');

            expect(_scope.quoteCtrl.order).toEqual('someKindOfOrder');
        }))
    })

    describe('favQuote', function()
    {
        it('should throw error - wrong id param', inject(function($controller)
        {
            spyOn(_QuotesDAO, 'favQuote').and.callFake(angular.noop);
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});
            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, '  ', {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _scope.quoteCtrl.favQuote(_wrongParams[i]);

                expect(_QuotesDAO.favQuote).toHaveBeenCalledWith(_wrongParams[i]);
                expect(_SocketService.emit).not.toHaveBeenCalled();
            }
        }))

        it('should fetch like correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond();

            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.quoteCtrl.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - empty response from the server', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').and.callThrough();
            spyOn(_SocketService, 'on').and.callThrough();

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];


            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.quoteCtrl.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - no updated object retrieved', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.quoteCtrl.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - no id retrieved', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.quoteCtrl.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should substitute the existing object with the retrieved object from the server', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.quoteCtrl.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))
    })

    describe('shuffle', function()
    {
        it('should call the right method from the service', inject(function($controller)
        {
            spyOn(Randomizer, 'shuffle').and.callFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.quoteCtrl.quotes = [1, 2];

            _scope.quoteCtrl.shuffle();

            expect(_scope.quoteCtrl.order).toBeNull();
            expect(Randomizer.shuffle).toHaveBeenCalledWith(_scope.quoteCtrl.quotes);
        }))
    })

    describe('setSingle', function()
    {
        it('should throw error - wrong quotes param', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, '  '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.quoteCtrl.setSingle(_wrongParams[i]);
                }).toThrow(new Error('Houve um erro ao randomizar as mensagens. O objeto passado não é um objeto ou array válido.'));
            }
        }))

        it('should set the full quotes to single quotes correctly', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _quotes = [];

            for (var i = 0; i < 1000; i++)
            {
                _quotes.push({author: 'Eric'+i,
                              quote: 'Alguma Coisa'+i,
                              likes: i});
            }

            _scope.quoteCtrl.quotes = _quotes;

            _scope.quoteCtrl.setSingle(_quotes);

            expect(_scope.quoteCtrl.quotes).toBeDefined();
            expect(_scope.quoteCtrl.quotes.length).toBe(1);

            expect(_scope.quoteCtrl.quotes[0].author).toBeDefined();
            expect(_scope.quoteCtrl.quotes[0].quote).toBeDefined();
            expect(_scope.quoteCtrl.quotes[0].likes).toBeDefined();
        }))
    })

    describe('multiple-view', function()
    {
        it('should set the quotes back to normal', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.quoteCtrl.quotes = [];

            for (var i = 0; i < 1000; i++)
            {
                _scope.quoteCtrl.quotes.push({author: 'Eric'+i,
                                    quote: 'Alguma Coisa'+i,
                                    likes: i});
            }

            _scope.quoteCtrl.quotesKeeper = _scope.quoteCtrl.quotes;
            _scope.quoteCtrl.setSingle(_scope.quoteCtrl.quotes);
            _scope.quoteCtrl.setMultiple();

            expect(_scope.quoteCtrl.quotes.length).toBe(1000);
            expect(_scope.quoteCtrl.singleView).toBeFalsy();
        }))
    })

    describe('createQuote', function()
    {
        it('should call the right method from the DAO', inject(function($controller)
        {
            spyOn(_QuotesDAO, 'createQuote').and.callFake(function(){return {then: angular.noop}});

            var _quote = {author: 'eric', quote: 'abcdef'};

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.quoteCtrl.createQuote(_quote);

            expect(_QuotesDAO.createQuote).toHaveBeenCalledWith(_quote);
        }))

        it('should call the right method, promise rejected with error', inject(function($controller)
        {
            var _quote = new _QuotesModel({author: 'eric', quote: 'abcdef'});

            _httpMock.expectGET('/api/quotes').respond(200, []);
            _httpMock.expectPOST('/api/quotes', _quote).respond(400, {error: 'error here'});

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.quoteCtrl.createQuote(_quote);

            _httpMock.flush();
        }))

        it('should call the right method, promise resolved correctly', inject(function($controller)
        {
            var _responseGET = [{author: 'a', quote: 'b', likes: 1}];
            var _responsePOST = {_id: "abc123", author: 'eric', quote: 'abcdef', likes: 0};

            var _quote = new _QuotesModel({author: 'eric', quote: 'abcdef'});

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);
            _httpMock.expectPOST('/api/quotes', _quote).respond(_responsePOST);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.quoteCtrl.createQuote(_quote);

            _httpMock.flush();

            expect(_scope.quoteCtrl.quotes.length).toBe(2);

            expect(angular.equals(_scope.quoteCtrl.quotes[0], _responseGET[0])).toBeTruthy();
            expect(angular.equals(_scope.quoteCtrl.quotes[1], _responsePOST)).toBeTruthy();

            expect(_scope.quoteCtrl.quoteInstance.author).toBeNull();
            expect(_scope.quoteCtrl.quoteInstance.quote).toBeNull();
            expect(_scope.quoteCtrl.quoteInstance.likes).toBe(0);
        }))
    })

    describe('randomize', function()
    {
        it('should call the right service/method', inject(function($controller)
        {
            var _responseGET = [{author: 'a', quote: 'b', likes: 1}];
            spyOn(Randomizer, 'shuffleSingle').and.callFake(angular.noop);

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            _scope.quoteCtrl.randomize();

            expect(Randomizer.shuffleSingle).toHaveBeenCalledWith(_responseGET);
        }))
    })

    describe('quotes:faved', function()
    {
        it('should call the right method', inject(function($controller)
        {
            spyOn(_SocketService, 'on').and.callThrough();

            var _responseGET = [{author: 'a', quote: 'b', likes: 1, _id: '1'}];

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(_SocketService.on).toHaveBeenCalled();
        }))
    })

    describe('__onFavorited', function()
    {
        it('should NOT update the likes in quotes - different ids', inject(function($controller)
        {
            var _responseGET = [{author: 'a', quote: 'b', likes: 1, _id: 1}];

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            _scope.quoteCtrl.__onFavorited({_id: 0, likes: 999});

            expect(_scope.quoteCtrl.quotes[0].likes).toEqual(1);
        }))

        it('should update the likes in quotes - same id', inject(function($controller)
        {
            var _responseGET = [{author: 'a', quote: 'b', likes: 1, _id: 0}];

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            _scope.quoteCtrl.__onFavorited({_id: 0, likes: 999});

            expect(_scope.quoteCtrl.quotes[0].likes).toEqual(999);
        }))

        it('should update the likes in quotes - same id - array returned in the first GET', inject(function($controller)
        {
            var _responseGET = [{author: 'a', quote: 'b', likes: 1, _id: 0}, {author: 'a', quote: 'b', likes: 1, _id: 999}, {author: 'a', quote: 'b', likes: 15, _id: 111}];

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            _scope.quoteCtrl.__onFavorited({_id: 111, likes: 15});

            expect(_scope.quoteCtrl.quotes[2].likes).toEqual(15);
        }))
    })
})
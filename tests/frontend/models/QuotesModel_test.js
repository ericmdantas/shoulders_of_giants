"use strict";

describe('QuotesModel', function()
{
    var _httpMock, _quote;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _quote = new ($injector.get('QuotesModel'))();
    }))
})
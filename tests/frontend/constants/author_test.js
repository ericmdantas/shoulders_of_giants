"use strict";

describe('author', function()
{
    var _author;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _author = $injector.get('author');
    }))

    describe('creation', function()
    {
        it('should have the name set to Eric Mendes Dantas', function()
        {
            expect(_author.name).toEqual('Eric Mendes Dantas');
        })

        it('should have the github page set to /ericmdantas', function()
        {
            expect(_author.github).toEqual('https://github.com/ericmdantas');
        })
    })
})
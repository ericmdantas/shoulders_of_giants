"use strict";

describe('app', function()
{
    var VERSION, QUOTE_LIKED_KEY;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        VERSION = $injector.get('VERSION');
        QUOTE_LIKED_KEY = $injector.get('QUOTE_LIKED_KEY');
    }))

    describe('VERSION', function()
    {
        it('should have version defined', function()
        {
            expect(VERSION).toBeDefined();
            expect(typeof VERSION).toBe('string');
        })
    })

    describe('QUOTE_LIKED_KEY', function()
    {
        it('should have the right value for the const', function()
        {
            expect(QUOTE_LIKED_KEY).toEqual('q_liked');
        })
    })
})
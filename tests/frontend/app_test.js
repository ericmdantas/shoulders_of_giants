"use strict";

describe('app', function()
{
    var VERSION;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        VERSION = $injector.get('VERSION');
    }))

    describe('VERSION', function()
    {
        it('should have version defined', function()
        {
            expect(VERSION).toBeDefined();
            expect(typeof VERSION).toBe('string');
        })
    })
})
"use strict";

var assert = require('assert');
var quotes = require('../../../controllers/QuotesController');
var helper = require('../helper');
var Quotes = require('../../../models/Quotes');

describe('QuotesController', function()
{
    var req = {params: {id: '535d85946ab81777bf583d26'}};
    var res = {json: function(){}};

    beforeEach(function(done)
    {
        helper.create('quotes', done);
    })

    afterEach(function(done)
    {
        Quotes.remove(done);
    })

    describe('getQuotes', function()
    {
        it('should throw error', function(done)
        {
            res.json = function(obj)
            {
                assert.strictEqual(obj.quotes instanceof Error, false);
                assert.strictEqual(typeof obj.quotes, "object");
                assert.strictEqual(obj.quotes.length, 11);
            }

            quotes.getAllQuotes(req, res);

            done();
        })
    })

    describe('_favSpecificQuote', function()
    {
        it('should throw an error - wrong id param', function(done)
        {
            req.params.id = null;
            done();
        })
    })
})
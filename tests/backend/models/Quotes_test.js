"use strict";

var assert = require('assert');
var mongoose = require('mongoose');
var Quotes = require('../../../models/Quotes');
var db = require('../config/db.json');
var helper = require('../helper');

describe('quotes', function()
{
    before(function()
    {
        mongoose.connect(db.db.test.url);
        mongoose.connection.on('error', function() {});
    })

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
        it('should be no errors', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                             {
                                 assert.strictEqual(err, null);
                                 assert.strictEqual(quotes.length, 11);
                                 done();
                             })
        })

        it('should return the object correctly', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                              {
                                    assert.strictEqual(err, null);
                                    assert.strictEqual(quotes[0].author, "eric0");
                                    assert.strictEqual(quotes[0].quote, "mensagem0");
                                    assert.strictEqual(quotes[0].likes, 10);
                                    done();
                              });
        })
    })

    describe('favoriteSpecificQuote', function()
    {
        it('should throw error - wrong id param', function(done)
        {
            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, {}, []];

            var _quote = new Quotes();

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _quote.favSpecificQuote(_wrongParams[i], function(err, updated)
                {
                    assert.notStrictEqual(err, null);
                    assert.strictEqual(err instanceof Error, true);
                    assert.strictEqual(updated, null);
                })
            }

            done();
        })

        it('should increment by one the first quote correctly', function(done)
        {
            var _id = '535d85946ab81777bf583d26';
            var _quote = new Quotes();

            _quote.favSpecificQuote(_id, function(err, updated)
            {
                assert.strictEqual(err, null);
                assert.strictEqual(updated.likes, 11);
                done();
            })
        })

        it('should increment by one the third quote correctly', function(done)
        {
            var _id = '535d85946ab81777bf583d28';
            var _quote = new Quotes();

            _quote.favSpecificQuote(_id, function(err, updated)
            {
                assert.strictEqual(err, null);
                assert.strictEqual(updated.likes, 100001);
                done();
            })
        })
    })
})
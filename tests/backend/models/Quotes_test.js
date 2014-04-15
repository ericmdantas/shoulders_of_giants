"use strict";

var assert = require('assert');
var mongoose = require('mongoose');
var Quotes = require('../../../models/Quotes');

describe('quotes', function()
{
    before(function()
    {
        mongoose.connect('mongodb://localhost/quotes_test');
        mongoose.connection.on('error', function() {});
    })

    beforeEach(function(done)
    {
        Quotes.create({author: "eric1", quote:  "mensagem1", likes: 1},
                      {author: "fulano", quote: "unknown quote", likes: 0}, done);
    })

    afterEach(function(done)
    {
        Quotes.remove(done);
    })

    describe('getQuotes - checks if it\'s returning all the info from the db', function()
    {
        it('there should be no errors', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                             {
                                 assert.strictEqual(err, null);
                                 assert.strictEqual(quotes.length, 2);
                                 done();
                             })
        })

        it('checks if the author is correct', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                              {
                                    assert.strictEqual(err, null);
                                    assert.strictEqual(typeof quotes[0].author, "string");
                                    done();
                              })
        })

        it('checks if the quote is correct', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                             {
                                 assert.strictEqual(err, null);
                                 assert.strictEqual(typeof quotes[0].quote, "string");
                                 done();
                             })
        })

        it('checks if the quote is correct', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                             {
                                 assert.strictEqual(typeof quotes[0].likes, "string");
                                 done();
                             })
        })
    })
})
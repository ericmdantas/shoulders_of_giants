"use strict";

var assert = require('assert');
var mongoose = require('mongoose');
var Quotes = require('../../../models/Quotes');
var db = require('../config/db.json');

describe('quotes', function()
{
    before(function()
    {
        mongoose.connect(db.db.test.url);
        mongoose.connection.on('error', function() {});
    })

    describe('getQuotes', function()
    {
        beforeEach(function(done)
        {
            Quotes.create({author: "eric1", quote:  "mensagem1", likes: 1}, done);
        })

        afterEach(function(done)
        {
            Quotes.remove(done);
        })

        it('should be no errors', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                             {
                                 assert.strictEqual(err, null);
                                 assert.strictEqual(quotes.length, 1);
                                 done();
                             })
        })

        it('should return the object correctly', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                              {
                                    assert.strictEqual(err, null);
                                    assert.strictEqual(quotes[0].author, "eric1");
                                    assert.strictEqual(quotes[0].quote, "mensagem1");
                                    assert.strictEqual(quotes[0].likes, "1");
                                    done();
                              });
        })
    })

    describe('getBestQuotes', function()
    {
        beforeEach(function(done)
        {
            Quotes.create({author: "eric1", quote:  "mensagem1", likes: 96},
                          {author: "eric2", quote:  "mensagem2", likes: 2},
                          {author: "eric3", quote:  "mensagem3", likes: 97},
                          {author: "eric4", quote:  "mensagem4", likes: 98},
                          {author: "eric5", quote:  "mensagem5", likes: 99}, done);
        })

        afterEach(function(done)
        {
            Quotes.remove(done);
        })

        it('should be no errors', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getBestQuotes(function(err, quotes)
            {
                assert.strictEqual(err, null);
                assert.strictEqual(quotes.length, 5);
                done();
            })
        })

        it('should return the object sorted desc by likes', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getBestQuotes(function(err, quotes)
            {
                assert.strictEqual(err, null);
                assert.strictEqual(quotes[0].author, "eric5");
                assert.strictEqual(quotes[0].quote, "mensagem5");
                assert.strictEqual(quotes[0].likes, "99");
                assert.strictEqual(quotes[1].author, "eric4");
                assert.strictEqual(quotes[1].quote, "mensagem4");
                assert.strictEqual(quotes[1].likes, "98");
                assert.strictEqual(quotes[2].author, "eric3");
                assert.strictEqual(quotes[2].quote, "mensagem3");
                assert.strictEqual(quotes[2].likes, "97");
                assert.strictEqual(quotes[3].author, "eric1");
                assert.strictEqual(quotes[3].quote, "mensagem1");
                assert.strictEqual(quotes[3].likes, "96");
                assert.strictEqual(quotes[4].author, "eric2");
                assert.strictEqual(quotes[4].quote, "mensagem2");
                assert.strictEqual(quotes[4].likes, "2");

                done();
            });
        })
    })
})
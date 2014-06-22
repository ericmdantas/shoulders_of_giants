"use strict";

var expect = require('chai').expect;
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
                                 expect(err).to.not.be.defined;
                                 expect(quotes).to.have.length(11);
                                 done();
                             })
        })

        it('should return the object correctly', function(done)
        {
            var _quotes = new Quotes();
            _quotes.getQuotes(function(err, quotes)
                              {
                                    expect(err).to.not.be.defined;
                                    expect(quotes[0]).to.have.property('author').and.to.equal("eric0");
                                    expect(quotes[0]).to.have.property('quote').and.to.equal("mensagem0");
                                    expect(quotes[0]).to.have.property('likes').and.to.equal(10);
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
                    expect(err).to.be.defined;
                    expect(err instanceof Error).to.be.true;
                    expect(updated).to.not.be.defined;
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
                expect(err).to.not.be.defined;
                expect(updated).to.be.defined;
                expect(updated).to.have.property('likes').and.to.equal(11);
                done();
            })
        })

        it('should increment by one the third quote correctly', function(done)
        {
            var _id = '535d85946ab81777bf583d28';
            var _quote = new Quotes();

            _quote.favSpecificQuote(_id, function(err, updated)
            {
                expect(err).to.not.be.defined;
                expect(updated).to.have.property('likes').and.to.equal(100001);
                done();
            })
        })
    })
})
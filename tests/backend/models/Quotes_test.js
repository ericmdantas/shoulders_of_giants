"use strict";

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Quotes = require('../../../models/Quotes');
var db = require('../config/db.json');
var helper = require('../helper');

describe('quotes', function()
{
    var _quote;

    before(function()
    {
        mongoose.connect(db.db.test.url);
        mongoose.connection.on('error', function() {});
    })

    beforeEach(function(done)
    {
        helper.create('quotes', done);
        _quote = new Quotes();
    })

    afterEach(function(done)
    {
        Quotes.remove(done);
    })

    describe('getQuotes', function()
    {
        it('should be no errors', function(done)
        {
            _quote.getQuotes(function(err, quotes)
                             {
                                 expect(err).to.not.be.defined;
                                 expect(quotes).to.have.length(11);
                                 done();
                             })
        })

        it('should return the object correctly', function(done)
        {
            _quote.getQuotes(function(err, quotes)
                              {
                                    expect(err).to.not.be.defined;
                                    expect(quotes[0]).to.have.property('author').and.to.equal("eric0");
                                    expect(quotes[0]).to.have.property('quote').and.to.equal("mensagem0");
                                    expect(quotes[0]).to.have.property('likes').and.to.equal(0);
                                    done();
                              });
        })
    })

    describe('favoriteSpecificQuote', function()
    {
        it('should throw error - wrong id param', function(done)
        {
            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, {}, []];

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

            _quote.favSpecificQuote(_id, function(err, updated)
            {
                expect(err).to.not.be.defined;
                expect(updated).to.be.defined;
                expect(updated).to.have.property('likes').and.to.equal(1);
                done();
            })
        })

        it('should increment by one the third quote correctly', function(done)
        {
            var _id = '535d85946ab81777bf583d28';

            _quote.favSpecificQuote(_id, function(err, updated)
            {
                expect(err).to.not.be.defined;
                expect(updated).to.have.property('likes').and.to.equal(4);
                done();
            })
        })
    })

    describe('getQuotesOrderedBy', function()
    {
        it('should throw an error, no order specified', function(done)
        {
            var _wrongParams = [null, undefined, 1, 0, '', '   ', {}, [], function(){}];

            var _callback = function(err, quotes)
            {
                expect(err).to.be.defined;
                expect(err).to.be.an.instanceof(Error);
                expect(err).to.match(/Não é possível ordenar .+ Parâmetro order errado./);
            }

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _quote.getQuotesOrderedBy(_wrongParams[i], _callback);
            }

            done();
        })

        it('should return ordered by author asc', function(done)
        {
            var _order = 'author';

            var _callback = function(err, quotes)
            {
                expect(err).to.not.be.defined;
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric0');
                expect(quotes[0].quote).to.equal('mensagem0');
                expect(quotes[0].likes).to.equal(0);
                done();
            }

            _quote.getQuotesOrderedBy(_order, _callback);
        })

        it('should return ordered by author desc', function(done)
        {
            var _order = '-author';

            var _callback = function(err, quotes)
            {
                expect(err).to.not.be.defined;
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            _quote.getQuotesOrderedBy(_order, _callback);
        })

        it('should return ordered by quote asc', function(done)
        {
            var _order = 'quote';

            var _callback = function(err, quotes)
            {
                expect(err).to.not.be.defined;
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric0');
                expect(quotes[0].quote).to.equal('mensagem0');
                expect(quotes[0].likes).to.equal(0);
                done();
            }

            _quote.getQuotesOrderedBy(_order, _callback);
        })

        it('should return ordered by quote desc', function(done)
        {
            var _order = '-quote';

            var _callback = function(err, quotes)
            {
                expect(err).to.not.be.defined;
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            _quote.getQuotesOrderedBy(_order, _callback);
        })

        it('should return ordered by likes asc', function(done)
        {
            var _order = 'likes';

            var _callback = function(err, quotes)
            {
                expect(err).to.not.be.defined;
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric0');
                expect(quotes[0].quote).to.equal('mensagem0');
                expect(quotes[0].likes).to.equal(0);
                done();
            }

            _quote.getQuotesOrderedBy(_order, _callback);
        })

        it('should return ordered by likes desc', function(done)
        {
            var _order = '-likes';

            var _callback = function(err, quotes)
            {
                expect(err).to.not.be.defined;
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            _quote.getQuotesOrderedBy(_order, _callback);
        })

        it('should return ordered by likes desc - ALL ON CAPS', function(done)
        {
            var _order = '-LIKES';

            var _callback = function(err, quotes)
            {
                expect(err).to.not.be.defined;
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            _quote.getQuotesOrderedBy(_order, _callback);
        })
    })
})
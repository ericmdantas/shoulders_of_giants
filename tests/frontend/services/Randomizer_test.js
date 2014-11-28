"use strict";

describe('Randomizer', function()
{
    var _Randomizer;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _Randomizer = $injector.get('Randomizer');
    }))

    describe('shuffle', function()
    {
        it('should shuffle the array - objects', function()
        {
            var _x = [];

            for (var i = 0; i < 100; i++)
            {
                _x.push({nome: 'n'+i, idade: 'i'+i, cpf: 'c'+i, outraCoisa: 'd'+i});
            }

            var _y = new Array(_x);

            for (var j = 0; j < _x.length; j++)
            {
                expect(_Randomizer.shuffle(_x)[j]).not.toEqual(_y[j]);
            }
        })
    })

    describe('shuffleSingle', function()
    {
        it('should set a different quote from what\'s showing', function()
        {
            var _array = [{author: 'Eric', quote: 'Mensagem0', likes: 0}];

            var quotesBeforeRandom = _array;

            var _keeper = [];

            for (var i = 0; i < 1000; i++)
            {
                _keeper.push({author: 'Eric'+i, quote: 'Mensagem'+i, likes: i});
            };

            _Randomizer.shuffleSingle(_keeper);

            expect(_keeper).not.toBe(quotesBeforeRandom);
        })
    })
})
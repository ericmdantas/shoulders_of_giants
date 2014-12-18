"use strict";

quotesApp
    .service('Randomizer', [function()
{
    var _shuffle = function(array)
    {
        var m = array.length, t, i;

        while (m)
        {
            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    var _shuffleSingle = function(array)
    {
        var _quotesLength = array.length;
        var _random = Math.floor(Math.random() * _quotesLength);

        return [array[_random]];
    }

    this.shuffle = _shuffle;
    this.shuffleSingle = _shuffleSingle;
}])
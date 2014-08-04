"use strict";

describe('view', function()
{
    browser.get('/#');

    describe('elements', function()
    {
        it('should have the right title', function()
        {
            expect(browser.getTitle()).toEqual('shoulders of giants');
        })

        it('should have the right header title', function()
        {
            expect(element(by.id('main-title')).getText()).toEqual('shoulders of giants')
        })

        it('the options should exist', function()
        {
            expect($('type-of-visualization').isDisplayed()).toBeTruthy();
        })

        it('the options should exist', function()
        {
            expect($('navigation').isDisplayed()).toBeTruthy();
        })

        it('the options should exist', function()
        {
            expect($('filter').isDisplayed()).toBeTruthy();
        })

        it('the options should exist', function()
        {
            expect($('contact').isDisplayed()).toBeTruthy();
        })
    })

    describe('visualization', function()
    {
        it('should click on the view tab and it should open', function()
        {
            element(by.tagName('type-of-visualization'))
                .click()
                .then(function()
                {
                    expect($('type-of-visualization ul').getAttribute('style')).toContain('block');

                    browser.sleep(2000); // because of fade effect

                    expect($('navigation ul').getAttribute('style')).toContain('none');
                    expect($('filter ul').getAttribute('style')).toContain('none');
                })
        })
    })

    describe('navigation', function()
    {
        it('should click on the view tab and it should open', function()
        {
            element(by.tagName('navigation'))
                .click()
                .then(function()
                {
                    expect($('navigation ul').getAttribute('style')).toContain('block');

                    browser.sleep(2000); // because of fade effect

                    expect($('type-of-visualization ul').getAttribute('style')).toContain('none');
                    expect($('filter ul').getAttribute('style')).toContain('none');
                })
        })
    })

    describe('filter', function()
    {
        it('should click on the view tab and it should open', function()
        {
            element(by.tagName('filter'))
                .click()
                .then(function()
                {
                    browser.sleep(2000); // because of fade effect

                    expect($('filter ul').getAttribute('style')).toContain('block');

                    expect($('type-of-visualization ul').getAttribute('style')).toContain('none');
                    expect($('navigation ul').getAttribute('style')).toContain('none');
                })
        })

        it('start to filter something - zero results', function()
        {
            element(by.tagName('filter'))
                .click()
                .then(function()
                {
                    browser.sleep(2000);

                    $('filter .filter').sendKeys('abcdef');

                    expect(element(by.className('cards')).isPresent()).toBeFalsy();

                    $('filter .filter').clear();
                })
        })

        it('start to filter something', function()
        {
            element(by.tagName('filter'))
                .click()
                .then(function()
                {
                    browser.sleep(2000);

                    $('filter .filter').sendKeys('courage');

                    expect(element(by.className('cards')).isPresent()).toBeTruthy();
                })
        })
    })
})
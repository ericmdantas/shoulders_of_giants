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
            expect($('#logo').isPresent()).toBeTruthy();
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
                    browser.sleep(1000); // because of fade effect

                    expect($('#emd-blanket').getAttribute('style')).not.toContain('none');
                    expect($('#emd-options').getAttribute('style')).not.toContain('none');
                })
        })
    })

    describe('navigation', function()
    {
        it('should click on the view tab and it should open', function()
        {
            $('#emd-blanket')
                .click()
                .then(function()
                {
                    browser.sleep(1000);

                    element(by.tagName('navigation'))
                        .click()
                        .then(function()
                        {
                            browser.sleep(1000); // because of fade effect

                            expect($('#emd-blanket').getAttribute('style')).not.toContain('none');
                            expect($('#emd-options').getAttribute('style')).not.toContain('none');

                            $('#emd-blanket').click();
                        })
                })
        })
    })

    describe('filter', function()
    {
        afterEach(function()
        {
            $('.filter').clear();
        })

        it('start to filter something - zero results', function()
        {
            $('.filter').sendKeys('abcdef');

            expect(element(by.className('cards')).isPresent()).toBeFalsy();
        })

        it('start to filter something', function()
        {
            $('.filter').sendKeys('courage');

            expect(element(by.className('cards')).isPresent()).toBeTruthy();
        })
    })
})
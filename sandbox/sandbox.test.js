// test.js

describe('Google', () => {
    beforeAll(async () => {
        await page.goto('http://google.com');
    });

    it('should be titled "Google"', async () => {
        await expect(page.title()).resolves.toMatch('Google');
    });
});

const website = require("./website.config.js");

describe('cms-home', () => {
    beforeAll(async () => {
        await page.goto(website.base_url);
    });

    it('should be titled "Madison Island"', async () => {
        await expect(page.title()).resolves.toMatch('Madison Island');
    });
});

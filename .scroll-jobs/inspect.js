const puppeteer = require('puppeteer');
const path = require('path');

const url = process.argv[2];
const name = process.argv[3];

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 30000 });
    await new Promise(r => setTimeout(r, 4000));

    const info = await page.evaluate(() => ({
        scrollHeight: document.documentElement.scrollHeight,
        bodyScrollHeight: document.body.scrollHeight,
        viewport: window.innerHeight,
        title: document.title,
        bodyText: (document.body.innerText || '').slice(0, 400)
    }));
    console.log(JSON.stringify(info, null, 2));
    await page.screenshot({ path: path.join(__dirname, `${name}-top.png`), fullPage: false });
    await page.screenshot({ path: path.join(__dirname, `${name}-full.png`), fullPage: true });
    await browser.close();
})();

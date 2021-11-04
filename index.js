require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const user = process.env.ID;
  const pass = process.env.PASS;
  const url = process.env.URL;
  await page.setExtraHTTPHeaders({Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`});
  await page.goto(url);

  await browser.close();
})();
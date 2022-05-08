require('dotenv').config();
const puppeteer = require('puppeteer');
const wifi = require('node-wifi');

wifi.init({
  iface: null
});

wifi.getCurrentConnections((error, currentConnections) => {
  if (error) {
    console.log(error);
  } else {
    const ssid = currentConnections[0].ssid;
    if (ssid === process.env.SSID) {
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
    }
  }
});
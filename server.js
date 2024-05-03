const puppeteer = require("puppeteer");

async function scrapeData() {
  // free proxy server URL
  const proxyURL = "http://136.243.89.93";

  // launch a browser instance with the
  // --proxy-server flag enabled
  const browser = await puppeteer.launch({
    args: [`--proxy-server=${proxyURL}`],
  });
  // open a new page in the current browser context
  const page = await browser.newPage();

  // visit the target page
  await page.goto("https://mpdev.nl");

  // extract the IP the request comes from
  // and print it
  const body = await page.waitForSelector("body");
  const ip = await body.getProperty("textContent");
  console.log(await ip.jsonValue());

  await browser.close();
}
scrapeData();
// //adding Puppeteer library

// const puppeteer = require("puppeteer-extra");
// const proxyURL = `http://64.225.8.82:9995`;
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// puppeteer.use(StealthPlugin());

// async function scrape() {
//   const browser = await puppeteer.launch({
//     args: [`--proxy-server=${proxyURL}`],
//     // headless: true,
//   });
//   console.log("Running tests..");
//   const page = await browser.newPage();
//   await page.goto("https://bot.sannysoft.com");
//   // await page.goto("https://www.ah.nl/zoeken/api/products/search?query=worst");
//   // await page.goto("https://www.ah.nl/zoeken?query=Melk");

//   // await page.waitForTimeout(5000);
//   await page.screenshot({ path: "testresult.png", fullPage: true });
//   const html = await page.content();
//   console.log(html);
//   await browser.close();
//   console.log(`All done, check the screenshot. ✨`);
// }
// scrape();
// (async () => {
//   // Launch the browser and open a new blank page
//   // const browser = await pt.launch();
//   const browser = await pt.launch({ args: ["--user-agent=Mozilla/5.0 (...)"] });

//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto("https://www.ah.nl/zoeken/api/products/search?query=worst");
//   // await page.goto("https://www.ah.nl/query=melk");
//   // await page.screenshot({ path: "example.png", fullPage: true });
//   const html = await page.content();
//   console.log(html);
//   await browser.close();
// })();

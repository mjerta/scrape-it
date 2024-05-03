const puppeteer = require("puppeteer");
const fs = require("fs");
// const url = "https://mpdev.nl";
const searchQuery = "Worst";
const url = `https://www.ah.nl/zoeken?query=${searchQuery}&page=50`;
console.log(url);

// const puppeteer = require("puppeteer-extra");
// const proxyURL = `http://64.225.8.82:9995`;
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// puppeteer.use(StealthPlugin());

async function scrape() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  console.log("Running tests..");
  const page = await browser.newPage();
  // await page.goto("https://bot.sannysoft.com");
  // await page.goto("https://www.ah.nl/zoeken/api/products/search?query=worst");
  // await page.goto("https://www.ah.nl/zoeken?query=Melk&page=50");
  // await page.goto(
  //   "https://navigator-group1.tweakwise.com/navigation-search/ed681b01?tn_q=melk&tn_p=1&tn_ps=100&tn_sort=&tn_profilekey=j7p-r-mpYdper4-dWXrRrPKjbGQCLWi6Q0b_vCVVe-1hvA==&tn_cid=&format=json&tn_parameters=ae-productorrecipe%3Dproduct"
  // );
  await page.goto(url);
  const allItems = await page.evaluate(() => {
    const productCards = ".product-card-portrait_root__ZiRpZ";
    // for title
    const level1 = ".body_root__3tZaN";
    const level2 = ".product-card-portrait_content__DQ9nP";
    const level3 = ".link_root__EqRHd.product-card-portrait_link__5VsEK";
    const level4 = ".title_root__xSlPL.product-card-portrait_title__ZmvmX";
    const level5 =
      ".line-clamp_root__7DevG.line-clamp_active__5Qc2L.title_lineclamp__kjrFA";
    const selectorTitle = `${level1} ${level2} ${level3}, ${level4} ${level5}`;

    //for price
    const level1Price = ".header_root__ilMls";
    const level2Price = ".link_root__EqRHd";
    const level3Price = ".product-card-portrait_pricePromotion__nUtNo";
    const level4Price = ".price_portrait__pcgwD";
    const level5Price = ".price-amount_root__Sa88q";
    const level6Price = ".price-amount_integer__\\+e2XO";
    const selectorPrice = `${level1Price} ${level2Price} ${level3Price} ${level4Price} ${level5Price} ${level6Price}`;
    console.log(selectorPrice);

    return Array.from(document.querySelectorAll(productCards), (e) => ({
      title: e.querySelector(selectorTitle).innerText,
      price: e.querySelector(selectorPrice).innerText,
      // Add more properties as needed
    }));
  });

  // await page.waitForSelector("..product-card-portrait_root__ZiRpZ");
  // const allItems = await page.$(".product-card-portrait_root__ZiRpZ");
  await page.screenshot({ path: "testresult.png", fullPage: true });
  const html = await page.content();
  console.log(allItems);
  const jsonData = JSON.stringify(allItems, null, 2);
  const filePath = "output.json";

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return;
    }
    console.log("JSON file has been saved:", filePath);
  });

  await browser.close();
  console.log(`All done, check the screenshot. ✨`);
}
scrape();
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

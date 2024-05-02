//adding Puppeteer library
const pt = require("puppeteer");

(async () => {
  // Launch the browser and open a new blank page
  const browser = await pt.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://mpdev.nl");
  await page.screenshot({ path: "example.png" });
  await browser.close();
})();

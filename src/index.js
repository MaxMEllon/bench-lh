const lighthouse = require("lighthouse");
const puppeteer = require("puppeteer");
const config = require("./config");

const count = 1;
(async () => {
  let score = 0;
  try {
    for (let i = 0; i < count; i++) {
      const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-gpu"],
      });
      const result = await lighthouse(
        "http://localhost:3000",
        { port: new URL(browser.wsEndpoint()).port, ...config },
        config.lighthouseConfig
      );
      const fcp = result.lhr.audits["first-contentful-paint"].score * 100;
      const interactive = result.lhr.audits["interactive"].score * 100;
      const fci = result.lhr.audits["first-cpu-idle"].score * 100;
      const si = result.lhr.audits["speed-index"].score * 100;
      console.log({ fcp, interactive, fci, si });
      score += (fcp + interactive + fci + si) / 4;
      await browser.close();
    }
  } catch (err) {
    console.error(err);
  }

  console.log(score / count);
})();

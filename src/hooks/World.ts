import {After, Before, BeforeAll, AfterAll, setDefaultTimeout, Status} from "@cucumber/cucumber";
import {Browser, BrowserContext, chromium, Page} from "playwright";
import { ITestContext } from "../models/ITextContext";

let page: Page;
let browser: Browser;
let context: BrowserContext;
let testContext: ITestContext[];

setDefaultTimeout(60000);

BeforeAll(async () => {
    console.log("Launching browser...");
    browser = await chromium.launch({
      headless: false,
    });
    testContext = [];
  });
  
  Before(async () => {
    console.log("Creating new instance of context and page...");
    context = await browser.newContext();
    page = await context.newPage();
  });
  
  After(async function(Scenario) {
    if (Scenario.result.status != Status.PASSED)
      await this.attach(await page.screenshot({path: `./Screenshots/${Scenario.pickle.name}_${Date.now()}.png`, fullPage: true}), "image/png");
    
    console.log("Closing context and page...");
    await page.close();
    await context.close();
  });
  
  AfterAll(async () => {
    console.log("Closing browser...");
    browser?.close();
  });

export {page, browser, testContext}
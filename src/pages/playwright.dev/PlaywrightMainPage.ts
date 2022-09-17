import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../BasePage";

export class PlaywrightMainPage extends Basepage {
    // Define Page Selectors/Elements
    readonly mainPageIconLinkLocator: Locator;
    readonly searchButtonLocator: Locator;
    readonly docSearchInputLocator: Locator;
    readonly docSearchResultsLocator: Locator;
  
    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.mainPageIconLinkLocator = page.locator("//b[text()='Playwright']/ancestor::a");
      this.searchButtonLocator = page.locator("button.DocSearch-Button");
      this.docSearchInputLocator = page.locator("input.DocSearch-Input");
      this.docSearchResultsLocator = page.locator("span.DocSearch-Hit-title>mark");
    }
  
    // Define Login Page methods
  
    public async gotoPage() {
      console.log("Opening playwright.dev website");
      await this.page.goto("https://playwright.dev");
  
    }
  
    public async search(searchText: string) {
      console.log("entering search text");
      await this.docSearchInputLocator.fill(searchText);
    }

    public async clickSearch() {
      console.log("clicking search button");
      await this.searchButtonLocator.click();
    }

    public async getResults(): Promise<string[]> {
      let searchResult: string[] = [];
      let cnt = await this.docSearchResultsLocator.count();
      for (let i = 0; i < cnt; i++) {
        searchResult.push(await this.docSearchResultsLocator.nth(i).innerText())
      }
      return searchResult
    }
  }
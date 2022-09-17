import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../BasePage";

export class ATSFurniturePage extends Basepage {
    // Define Page Selectors/Elements
    readonly categoryMenuOptions: Locator;
    readonly categoryMenuOptionsContainer: Locator;
    readonly subcategoryMenuOptions: Locator;
    readonly searchInput: Locator;
    readonly searchCategoryOptions: Locator;
    readonly baseLink: Locator;
    readonly subcategoryOptionsSelector: string;
    readonly cartLink: Locator;
    // ...
  
    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.categoryMenuOptions = page.locator("ul.categorymenu>li>a");
      this.categoryMenuOptionsContainer = page.locator("ul.categorymenu>li");
      this.subcategoryOptionsSelector = "div.subcategories>ul:nth-child(1)>li>a:nth-child(1)";
      this.subcategoryMenuOptions = page.locator("div.subcategories>ul:nth-child(1)>li>a:nth-child(1)");
      this.searchInput = page.locator("input#filter_keyword");
      this.searchCategoryOptions = page.locator("ul#search-category>li>a");
      this.baseLink = page.locator("div.navbar-header>a");
      this.cartLink = page.locator("ul.topcart>li>a");
    }
  
    // Define Login Page methods
  
    public async searchAllCategories(searchText: string) {
      console.log("entering search text");
      await this.searchInput.fill(searchText);
      await this.page.keyboard.press("Enter");
      await page.waitForNavigation();
    }

    public async searchSpecificCategory(searchText: string, category: string) {
      console.log("entering search text with category");
      await this.searchInput.click();
      //await this.searchCategoryOptions.waitFor();

      let options: string[] = [];
      let cnt = await this.searchCategoryOptions.count();
      for (let i = 0; i < cnt; i++) {
        options.push((await this.searchCategoryOptions.nth(i).innerText()).trim());
      }

      if (options.includes(category)){
        await this.searchCategoryOptions.nth(options.indexOf(category)).click();
      }

      await this.searchInput.fill(searchText);
      await this.page.keyboard.press("Enter");
      await page.waitForNavigation();
    }

    public async getMenuOptions(): Promise<string[]> {
      console.log("getting menu options");
      let options: string[] = [];
      let cnt = await this.categoryMenuOptions.count();
      for (let i = 0; i < cnt; i++) {
        options.push(await (await this.categoryMenuOptions.nth(i).innerText()).trim());
      }
      return options;
    }

    public async getSubcategories(index: number): Promise<string[]> {
      var subcategories = await this.categoryMenuOptionsContainer.nth(index).locator(this.subcategoryOptionsSelector);
      let cnt = await subcategories.count()
      let options: string[] = [];
      for (let i = 0; i < cnt; i++) {
        options.push(await (await subcategories.nth(i).innerText()).trim());
      }
      return options;
    }

    public async selectCategory(category: string) {
      var options = await this.getMenuOptions();
      if (options.includes(category.toUpperCase())) {
        await this.categoryMenuOptions.nth(options.indexOf(category)).click();
      }
      //await page.waitForNavigation();
    }

    public async selectCategoryAndSubcategory(category: string, subcategory: string) {
      var options = await this.getMenuOptions();
      var cat = category.toUpperCase();
      let catLocator: Locator;
      let subcatLocatoMain: Locator;
      if (options.includes(cat)) {
        catLocator = this.categoryMenuOptions.nth(options.indexOf(cat));
        subcatLocatoMain = this.categoryMenuOptionsContainer.nth(options.indexOf(cat));
        await catLocator.hover();
      }
      else {
        throw new Error(`there is no such category ${category}`)
      }

      let subcategories: string[] = await this.getSubcategories(options.indexOf(category));
      if (subcategories.includes(subcategory)) {
        let subCatLocator: Locator = subcatLocatoMain.locator(this.subcategoryOptionsSelector);
        await subCatLocator.nth(subcategories.indexOf(subcategory)).hover();
        await subCatLocator.nth(subcategories.indexOf(subcategory)).click();
      }
      else {
        throw new Error(`there is no such subcategory ${subcategory} for category ${category}`)
      }

      await page.waitForNavigation();
    }

    public async goToCart() {
      await this.cartLink.click();
      //await page.waitForNavigation();
    }
  }
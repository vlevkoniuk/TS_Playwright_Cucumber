import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../../../BasePage";

export class ATSsubcategories extends Basepage {
    // Define Page Selectors/Elements
    readonly subcategoryitemspannel: Locator;
    readonly subcategory: Locator;
    readonly subcategoryLinkSelector: string
    readonly subcategories: Locator;
  
    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.subcategories = page.locator("div.contentpanel ul>li div>a");
      this.subcategoryitemspannel = page.locator("div.contentpanel ul");
      this.subcategory = this.subcategoryitemspannel.locator("li");
      this.subcategoryLinkSelector = "div>a";
    }

    public async isCategoryVisible(): Promise<boolean> {
        return await this.subcategory.count() > 0
    }

    public async selectSubCategory(subCategory: string) {
        let subcats = await this.getSubCats();
        if (subcats.includes(subCategory))
            await this.subcategories.nth(subcats.indexOf(subCategory)).click()

        //page.waitForNavigation();

    }

    public async getSubCats() :Promise<string[]> {
      let cnt = await this.subcategories.count();
      let items: string[] = [];
      for (let i = 0; i < cnt; i++) {
        items.push(await (await this.subcategories.nth(i).innerHTML()).trim());
      }
      return items;
    }

    // public async getSubCategories(): Promise<string[]> {
    //     let cats: string[] = [];
    //     if (await this.isCategoryVisible()) {
    //         let cnt = await this.subcategory.count();
    //         for (let i = 0; i < cnt; i++) {
    //             cats.push(await this.subcategory.nth(i).locator("div>a").innerText())
    //         }
    //     }
    //     return cats;
    // }

    // public async selectSubCategory(subCat: string) {
    //     let subcats: string[] = await this.getSubCategories();
    //     if (subcats.includes(subCat)) {
    //         await await this.subcategory.nth(subcats.indexOf(subCat)).locator("div>a").click();
    //     }
    // }
}
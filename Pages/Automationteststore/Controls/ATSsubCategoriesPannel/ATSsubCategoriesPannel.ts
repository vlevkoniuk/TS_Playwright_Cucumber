import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../../../BasePage";
import { ATSsubcategories } from "../ATSsubCategoriesPannel/subcategories"

export class ATSsubCategoriesPannel extends Basepage {
    // Define Page Selectors/Elements
    get SubCategories() {return new ATSsubcategories(this.page)}
    readonly subcategories: Locator;
    // ...
  
    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.subcategories = page.locator("div.contentpanel ul>li div>a");
    }
}
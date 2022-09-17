import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../../../BasePage";
import {ATSitems} from "../ATSitemsPannel/items"

export class ATSitemsPannel extends Basepage {
    // Define Page Selectors/Elements
    get ATSitem() {return new ATSitems(page)}
    readonly itemspannel: Locator;
    readonly categoryMenuOptions: Locator;
    readonly subcategoryMenuOptions: Locator;
    readonly searchInput: Locator;
    readonly searchCategoryOptions: Locator;
    readonly baseLink: Locator;
    readonly subcategoryOptionsSelector: string;
    // ...
  
    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.itemspannel = page.locator("div.contentpanel>div.list-inline");
      this.categoryMenuOptions = page.locator("ul.categorymenu>li>a");
      this.subcategoryOptionsSelector = "div.subcategories>ul:nth-child(1)>li>a:nth-child(1)";
      this.subcategoryMenuOptions = page.locator("div.subcategories>ul:nth-child(1)>li>a:nth-child(1)");
      this.searchInput = page.locator("input#filter_keyword");
      this.searchCategoryOptions = page.locator("ul#search-category>li>a");
      this.baseLink = page.locator("div.navbar-header>a");
    }
}
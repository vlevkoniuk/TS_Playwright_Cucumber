import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../BasePage";
import {ATSFurniturePage} from "./ATSFurniturePage";
import {ATSMainContainer} from "../Automationteststore/ATSMainContainer";
import { IShopItem } from "../../models/ShopItem";
import {ATScart} from "../Automationteststore/Controls/ATScart/ATScart"

export class ATSMainPage extends ATSFurniturePage {
    // Define Page Selectors/Elements
    readonly url: string;
    // ...
    get Container() {return new ATSMainContainer(page)}
    get Cart() {return new ATScart(page)}

    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.url = "https://automationteststore.com/";
    }

    public async goToPage() {
        await this.page.goto(this.url);
    }

    public async waitForNavigation() {
      await page.waitForNavigation();
    }

    // public async asserSearchResults(items: IShopItem[], searchCriteria: string) {
    //   for (let i = 0; i < items.length; i++) {
    //     expect(items[i].title).stringContaining(searchCriteria);
    //   }
    // }
}
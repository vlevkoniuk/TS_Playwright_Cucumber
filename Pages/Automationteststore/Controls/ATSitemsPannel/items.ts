import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../../../BasePage";
import { IShopItem } from "../../../../src//models/ShopItem"

export class ATSitems extends Basepage {
    // Define Page Selectors/Elements
    get Items() {return this.getAllItems()}

    readonly itemLocator: Locator;
    readonly itemtTitleSelector: string;
    readonly itemOnePriceSelector: string;
    readonly itemNewPriceSelector: string;
    readonly itemBasketSelector: string;
  
    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.itemLocator = page.locator("div.list-inline>div.col-md-3");
      this.itemtTitleSelector = "div.fixed_wrapper>div>a";
      this.itemOnePriceSelector = "div.pricetag>div>div.oneprice";
      this.itemNewPriceSelector = "div.pricetag>div>div.pricenew";
      this.itemBasketSelector = "div.pricetag>a";
    }

    public async getAllItems(): Promise<IShopItem[]> {
        let items: IShopItem[] = [];
        //await this.itemLocator.waitFor();
        const itemCnt = await this.itemLocator.count();
        for (let i = 0; i < itemCnt; i++)
        {
            let item: IShopItem = <IShopItem>{};
            item.title = await this.itemLocator.nth(i).locator(this.itemtTitleSelector).innerText();
            let selector: string = "";
            if (await this.itemLocator.nth(i).locator(this.itemOnePriceSelector).count() > 0)
                selector = this.itemOnePriceSelector;
            else if (await this.itemLocator.nth(i).locator(this.itemNewPriceSelector).count() > 0)
                selector = this.itemNewPriceSelector;
            let numS:string = await this.itemLocator.nth(i).locator(selector).innerText()
            item.price = Number(numS.replace(/[^0-9\.]+/g,""));
            item.isAvailable = await this.itemLocator.nth(i).locator(this.itemBasketSelector).count() > 0;
            if (item.isAvailable) {
                item.basketLocator = this.itemLocator.nth(i).locator(this.itemBasketSelector);
            }
            items.push(item);
        }
        return items;
    }

    public async shopItem(item: IShopItem) {
        await item.basketLocator.click();
    }
}
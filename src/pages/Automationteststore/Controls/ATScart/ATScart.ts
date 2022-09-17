import { Locator, Page, expect } from "@playwright/test";
import { Basepage } from "../../../BasePage";
import {ATSitems} from "../ATSitemsPannel/items"
import {ICartItem} from "../../../../models/CartItem";

export class ATScart extends Basepage {
    // Define Page Selectors/Elements
    get ATSitem() {return new ATSitems(page)}
    readonly itemsTable: Locator;
    readonly tableHeadersSelector: string;
    readonly tableRowsSelector: string;
    readonly tableRowsDataSelector: string;
    // ...
  
    // Initialize page elements using class constructor
    constructor(page: Page) {
      super(page);
      this.itemsTable = page.locator("div.product-list table");
      this.tableHeadersSelector = "tr>th";
      this.tableRowsSelector = "tr";
      this.tableRowsDataSelector = "td";
    }

    get CartItems() {return this.getCartItems()}

    public async getCartItems(): Promise<ICartItem[]> {
        let items: ICartItem[] = [];
        let headerNames: string[] = await this.getTableHeaders();
        let rowLocator: Locator = this.itemsTable.locator(this.tableRowsSelector);
        let rowCnt = await rowLocator.count();
        for (let i = 1; i < rowCnt; i++) {
            let item: ICartItem = <ICartItem>{};
            for (var name of headerNames) {
                if (name === "Name")
                    item.name = await rowLocator.nth(i).locator(this.tableRowsDataSelector).nth(headerNames.indexOf(name)).locator("a").innerText();
                if (name === "Model")
                    item.model = await (await rowLocator.nth(i).locator(this.tableRowsDataSelector).nth(headerNames.indexOf(name)).allInnerTexts()).join("");
                if (name === "Unit Price") {
                    let strPrice: string  = await (await rowLocator.nth(i).locator(this.tableRowsDataSelector).nth(headerNames.indexOf(name)).allInnerTexts()).join("");;
                    item.unitPrice = Number(strPrice.replace(/[^0-9\.]+/g,""));
                }
                if (name === "Quantity")
                {
                    let qty = await rowLocator.nth(i).locator(this.tableRowsDataSelector).nth(headerNames.indexOf(name)).locator("input").inputValue();
                    item.quantity = Number(qty);
                }
                if (name === "Total") {
                    let ttl = await (await rowLocator.nth(i).locator(this.tableRowsDataSelector).nth(headerNames.indexOf(name)).allInnerTexts()).join("");
                    item.total = Number(ttl.replace(/[^0-9\.]+/g,""));
                }
                if (name === "Remove")
                    item.removeLocator = rowLocator.nth(i).locator(this.tableRowsDataSelector).nth(headerNames.indexOf(name)).locator("a");
            }
            items.push(item);
        }
        return items;

    }

    public async getTableHeaders() : Promise<string[]> {
        let headerNames: string[] = [];
        let locator: Locator = this.itemsTable.locator(this.tableHeadersSelector);
        let headerCnt = await locator.count();
        for (let i = 0; i < headerCnt; i++) {
            headerNames.push(await locator.nth(i).innerText());
        }
        return headerNames;
    }
}
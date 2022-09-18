import { Given, When, Then, BeforeStep,  } from "@cucumber/cucumber";
import { IShopItem } from "../models/ShopItem";
import { ATSMainPage } from "../pages/Automationteststore/ATSMainPage";
import { expect } from '@playwright/test';
import {ITestContext} from "../models/TestContext";
import { ICartItem } from "../models/CartItem";
import { ATScartPage } from "../pages/Automationteststore/ATScartPage";

let ATSPage: ATSMainPage;
let ATScart: ATScartPage;

BeforeStep(async () => {
    ATSPage = new ATSMainPage(global.page)
});

Given("automationteststore.com website is opened", async () => await ATSPage.goToPage());

When("I am entering search text {string} in {string} category", async (searhText: string, category: string) => {
  await ATSPage.searchSpecificCategory(searhText, category);
});

Then("Search results should contain items with {string} entries", async (searhText: string) => {
  let searchResults: IShopItem[] = await ATSPage.Container.ItemsPannel.ATSitem.getAllItems();
  for (let i = 0; i < searchResults.length; i++) {
    expect<string>(searchResults[i].title.toLowerCase()).toContain(searhText);
  }
});

When("I am selecting {string} and {string}", async(category: string, subcategory: string) => {
    await ATSPage.selectCategory(category);
    await ATSPage.Container.SubCategoriesPannel.SubCategories.selectSubCategory(subcategory);

})

When("I am clicking to any available for shopping item", async() => {
    let items: IShopItem[] = await ATSPage.Container.ItemsPannel.ATSitem.Items;
    let availableItems = items.filter((obj) => {return obj.isAvailable === true});
    let randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    let storedValue: ITestContext = <ITestContext>{};
    storedValue.name = "randomCartItem";
    storedValue.value = randomItem;
    global.testContext.push(storedValue)
    await randomItem.basketLocator.click()

});

When("I am navigation to the cart", async() => {
    await ATSPage.goToCart();
    ATScart = new ATScartPage(global.page);
});

Then("Item should become available in basket", async () => {
    let storedValue: IShopItem = <IShopItem>{};
    let storedItem = global.testContext.filter((obj) => {
        return obj.name === "randomCartItem";
    })[0];
    global.testContext.splice(global.testContext.indexOf(storedItem))
    storedValue = <IShopItem>storedItem.value;
    let cartItems: ICartItem[]  = await ATScart.Cart.getCartItems();
    expect<string>(cartItems[0].name.toLowerCase()).toEqual(storedValue.title.toLowerCase())
    expect<number>(cartItems[0].quantity).toEqual(1);
});
import { Given, When, Then, BeforeStep,  } from "@cucumber/cucumber";
import { IShopItem } from "../../src/models/ShopItem";
import { ATSMainPage } from "../../Pages/Automationteststore/ATSMainPage";
import { expect } from '@playwright/test';
import {ITestContext} from "../../src/models/ITextContext";
import { ICartItem } from "../../src/models/CartItem";
import { ATScartPage } from "../../Pages/Automationteststore/ATScartPage";
import { page, testContext } from "../../src/hooks/World";
import { binding, given, then, when, before, beforeAll} from 'cucumber-tsflow';


@binding()
export class AutomationTestingStoreSteps {

  ATSPage: ATSMainPage;
  ATScart: ATScartPage;

  @before()
  public async BeforeStep() {
    this.ATSPage = new ATSMainPage(page)
  } 

  @given("automationteststore.com website is opened")
  public async OpenPage() {
    // Use the page instance from the World instance to navigate
    await this.ATSPage.goToPage();
  }

  @when("I am entering search text {string} in {string} category")
  public async EnterSearchTextAndCategory(searhText: string, category: string) {
    await this.ATSPage.searchSpecificCategory(searhText, category);
  }

  @then("Search results should contain items with {string} entries")
  public async SearchResultShouldCOntainText(searhText: string) {
    let searchResults: IShopItem[] = await this.ATSPage.Container.ItemsPannel.ATSitem.getAllItems();
    for (let i = 0; i < searchResults.length; i++) {
      expect<string>(searchResults[i].title.toLowerCase()).toContain(searhText);
    }
  }

  @when("I am selecting {string} and {string}")
  public async SelectCategoryAndSubcategury(category: string, subcategory: string) {
    await this.ATSPage.selectCategory(category);
    await this.ATSPage.Container.SubCategoriesPannel.SubCategories.selectSubCategory(subcategory);
  }

  @when("I am clicking to any available for shopping item")
  public async ClickAnyAvailableShopItem() {
    let items: IShopItem[] = await this.ATSPage.Container.ItemsPannel.ATSitem.Items;
    let availableItems = items.filter((obj) => {return obj.isAvailable === true});
    let randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    let storedValue: ITestContext = <ITestContext>{};
    storedValue.name = "randomCartItem";
    storedValue.value = randomItem;
    testContext.push(storedValue)
    await randomItem.basketLocator.click()
  }

  @when("I am navigating to the cart")
  public async NavigateToCart() {
    await this.ATSPage.goToCart();
    this.ATScart = new ATScartPage(page);
  }

  @then("Item should become available in basket")
  public async ItemFromContextShouldBeAvailableInBasket() {
    let storedValue: IShopItem = <IShopItem>{};
    let storedItem = testContext.filter((obj) => {
        return obj.name === "randomCartItem";
    })[0];
    testContext.splice(testContext.indexOf(storedItem))
    storedValue = <IShopItem>storedItem.value;
    let cartItems: ICartItem[]  = await this.ATScart.Cart.getCartItems();
    expect<string>(cartItems[0].name.toLowerCase()).toEqual(storedValue.title.toLowerCase())
    expect<number>(cartItems[0].quantity).toEqual(1);
  }
}
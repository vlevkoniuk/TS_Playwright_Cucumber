import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { PlaywrightMainPage } from "../pages/playwright.dev/PlaywrightMainPage";

let plPage: PlaywrightMainPage;

BeforeStep(async () => {
  plPage = new PlaywrightMainPage(global.page)
});

Given("playwright.dev website is opened", async () => await plPage.gotoPage());

When("I am clicking Search Button", async () => {
  await plPage.clickSearch();
});

When("I am entering search text on playwright site {string}", async (searhText: string) => {
  await plPage.search(searhText);
});

Then("Search results should contain {string}", async (searhText: string) => {
  let searchResults = await plPage.getResults();

});

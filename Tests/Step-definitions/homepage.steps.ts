import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { binding, given, then, when } from "cucumber-tsflow/dist";
import { page } from "../../src/hooks/World";


@binding()
export class HomePageSteps {

  @given("I view {string}")
  public async OpenPage(url: string) {
    // Use the page instance from the World instance to navigate
    await page.goto(`https://${url}`);
  }

  @when("I click {string}")
  public async ClickLink(link: string) {
    // ...then click it now it's within the viewport
    await page.click(`"${link}"`);
  }

  @then("I expect to be on the accessibility page")
  public async ExpectToBeOnAccessabilityPage() {
    const heading1Text = (await page.textContent("h1")) as string;
    assert.strictEqual(trimExcessWhiteSpace(heading1Text), "Accessibility statement");
  }
}

// textContent includes whitespace, so use this method to trim
// See https://stackoverflow.com/a/42921059
const trimExcessWhiteSpace = (s: string) =>
  s.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();

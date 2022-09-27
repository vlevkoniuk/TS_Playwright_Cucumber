import { Page } from "@playwright/test";

export class Basepage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

import { expect, test } from "@playwright/test";

export class SearchPage {
  constructor(page) {
    this.page = page;
    this.url =
      "https://www.google.com/search?q=synot+games&sca_esv=45c8bf4228d081b3&source=hp&ei=iVhLaLKIL_KGxc8P2de_yAs&iflsig=AOw8s4IAAAAAaEtmma2aYgeZl6Anx4lpjAnTk4SG7lrl&ved=0ahUKEwjy8PD9-uyNAxVyQ_EDHdnrD7kQ4dUDCBI&oq=synot+games&gs_lp=Egdnd3Mtd2l6IgtzeW5vdCBnYW1lc0gAUABYAHAAeACQAQCYAQCgAQCqAQC4AQzIAQCYAgCgAgCYAwCSBwCgBwCyBwC4BwDCBwDIBwA&sclient=gws-wiz";
    this.resultTitles = page.locator("h3");
    this.acceptButton = page.locator(
      'button:has-text("I agree"), button:has-text("Accept all")'
    );
    this.paginationItems = page.locator("table.AaVjTc td");
  }

  async goToHome() {
    await test.step("Navigate to Google homepage", async () => {
      await this.page.goto("https://www.google.com");
    });
  }

  async acceptCookiesIfVisible() {
    await test.step("Accept cookie consent if present", async () => {
      if (await this.acceptButton.isVisible()) {
        await this.acceptButton.click();
      }
    });
  }

  async openSearchUrl() {
    await test.step("Navigate directly to the Google search results for 'synot games'", async () => {
      await this.page.goto(this.url);
    });
  }

  async validatePaginationCount(minCount = 2) {
    await test.step("Validate that there are more than 1 pagination items", async () => {
      await this.page.waitForSelector("table.AaVjTc td");
      const count = await this.paginationItems.count();
      expect(count).toBeGreaterThanOrEqual(minCount);
    });
  }

  async validateTopResultsContain(term, topN = 5) {
    await test.step("Verify that one of the top 5 results includes the word 'synot'", async () => {
      const count = await this.resultTitles.count();
      expect(count).toBeGreaterThan(0);

      let found = false;
      for (let i = 0; i < Math.min(count, topN); i++) {
        const text = await this.resultTitles.nth(i).innerText();
        console.log(`Title ${i + 1}:`, text);
        if (text.toLowerCase().includes(term.toLowerCase())) {
          found = true;
          break;
        }
      }

      expect(found).toBe(true);
    });
  }
}

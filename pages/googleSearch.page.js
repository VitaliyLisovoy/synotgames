import { test } from "@playwright/test";

export class SearchPage {
  constructor(page) {
    this.page = page;
    this.url =
      "https://www.google.com/search?q=synot+games&sca_esv=45c8bf4228d081b3&source=hp&ei=iVhLaLKIL_KGxc8P2de_yAs&iflsig=AOw8s4IAAAAAaEtmma2aYgeZl6Anx4lpjAnTk4SG7lrl&ved=0ahUKEwjy8PD9-uyNAxVyQ_EDHdnrD7kQ4dUDCBI&oq=synot+games&gs_lp=Egdnd3Mtd2l6IgtzeW5vdCBnYW1lc0gAUABYAHAAeACQAQCYAQCgAQCqAQC4AQzIAQCYAgCgAgCYAwCSBwCgBwCyBwC4BwDCBwDIBwA&sclient=gws-wiz";
    this.searchBox = page.getByRole("combobox", { name: "Hľadať" });
    //   await page.getByRole('combobox', { name: 'Search' }).fill('synot games');
    this.searchBtn = page.getByRole("button", { name: "Hľadať Googlom" });
  }

  async fillInSearchBox(param) {
    await test.step(`fill in search box with search ${param}`, async () => {
      await this.searchBox.fill(param);
    });
  }

  async clickSearchBtn() {
    await test.step(`click  search button`, async () => {
      await this.searchBtn.first().click();
    });
  }

  async openSearchUrl() {
    await this.page.goto(this.url);
  }
}

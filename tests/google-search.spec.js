import { chromium, test, expect } from "@playwright/test";
import { SearchPage } from "../pages/google-search.page";

test("Google search in persistent session avoids CAPTCHA", async () => {
  // 🟢 Step 1: Launch Chrome in persistent mode (to reuse cookies and avoid CAPTCHA)
  const context = await chromium.launchPersistentContext("./profile", {
    headless: false,
  });

  // 🟢 Step 2: Open new page and initialize the SearchPage POM
  const page = await context.newPage();
  const searchPage = new SearchPage(page);

  // 🟢 Step 3: Navigate to Google homepage
  await searchPage.goToHome();

  // 🟢 Step 4: Accept cookie consent if present
  await searchPage.acceptCookiesIfVisible();

  // 🟢 Step 5: Navigate directly to the Google search results for "synot games"
  await searchPage.openSearchUrl();

  // 🟢 Step 6: Validate that there are more than 1 pagination items (i.e., multiple result pages)
  await searchPage.validatePaginationCount();

  // 🟢 Step 7: Verify that one of the top 5 results includes the word "synot"
  await searchPage.validateTopResultsContain("synot");
});

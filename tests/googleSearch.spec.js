import { chromium, test, expect } from "@playwright/test";
import { SearchPage } from "../pages/googleSearch.page";

test("Google search in persistent session avoids CAPTCHA", async () => {
  // Step 1: Launch Chrome with saved profile (persistent)
  const context = await chromium.launchPersistentContext("./profile", {
    headless: false,
  });

  // Step 2: Create new page from that context
  const page = await context.newPage();

  // Step 3: Initialize your Page Object
  const searchPage = new SearchPage(page);

  // Step 4: Navigate to Google
  await page.goto("https://www.google.com");

  // Accept cookies
  const accept = page.locator(
    'button:has-text("I agree"), button:has-text("Accept all")'
  );
  if (await accept.isVisible()) {
    await accept.click();
  }

  // Step 5: Use Page Object methods
  // await searchPage.fillInSearchBox("synot games");
  // await searchPage.clickSearchBtn();
  await searchPage.openSearchUrl();

  await page.waitForSelector("table.AaVjTc td");

  const paginationItems = page.locator("table.AaVjTc td");
  const paginationCount = await paginationItems.count();
  expect(paginationCount).toBeGreaterThan(1);

  // Step 6: Assert results
  // const results = page.locator("#search .g", { timeout: 5000 });
  // await expect(results).toHaveCountGreaterThan(0);
  // await expect(page.getByText("SYNOT Games").nth(1)).toBeVisible();

  // const text = await results.first().innerText();
  // expect(text.toLowerCase()).toContain("synot games");

  // Wait for results to load
  const titles = page.locator("h3");
  const count = await titles.count();
  expect(count).toBeGreaterThan(0); // Ensure we got results

  // Check if any of the first 5 contain "synot"
  let found = false;
  for (let i = 0; i < Math.min(count, 5); i++) {
    const text = await titles.nth(i).innerText();
    console.log(`Title ${i + 1}:`, text);
    if (text.toLowerCase().includes("synot")) {
      found = true;
      break;
    }
  }

  expect(found).toBe(true); // ✅ pass if at least one contains "synot"

  console.log("✅ Test finished. Leave browser open to reuse session.");
});

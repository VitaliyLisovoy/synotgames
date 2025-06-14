# synotgames

Test task

Playwright Automation Tests

This project contains automated tests written with Playwright.
It includes examples for:

✅ UI testing (e.g. Google Search with CAPTCHA handling)

✅ API testing (e.g. Dog CEO and ColorMagic APIs)

✅ Page Object Model (POM) structure for clean, reusable code

⚙️ Setup Instructions

This project requires Node.js (v16+) and Playwright

1. Clone the project
2. Install dependencies
   npm install
3. Install Playwright browsers
   npx playwright install

Running Tests

✅ Run all tests
npx playwright tests
▶️ Run a specific test
npx playwright test tests/google-search.spec.js

🔐 How to Run the Google Search Test (Bypassing CAPTCHA)

Google often shows a CAPTCHA to automation tools. This project solves that by:

💡 Using a persistent browser session

✅ Steps to run:

1. Manually run the test once:
   npx playwright test tests/google-search.spec.js
2. During the first run:

   If CAPTCHA appears, solve it manually.

   Do not close the browser — just let the test finish.

   The session will be saved in the ./profile folder.

3. Future runs will reuse this session:
   const context = await chromium.launchPersistentContext('./profile', {
   headless: false,
   });
   This prevents CAPTCHA from showing again as Google recognizes the session.

✅ Test Example: Google Search

This test:

Launches Google in a saved browser context
Accepts cookies
Searches for "synot games"
Verifies results and pagination
Confirms that top results contain the search term

import { test, request } from "@playwright/test";
import { ColorMagicApi } from "../pages/colormagic_api.page";

test('ColorMagic API - Validate palette structure for "green"', async () => {
  // 🟢 Step 1: Create an API context
  const apiContext = await request.newContext();

  // 🟢 Step 2: Initialize the ColorMagicApi
  const colorApi = new ColorMagicApi(apiContext);

  // 🟢 Step 3: Send GET request to search palettes for "green"
  await colorApi.searchPaletteByColor("green");

  // 🟢 Step 4: Verify that the response status is 200 OK
  await colorApi.validateResponseStatus();

  // 🟢 Step 5: Validate structure and content of each palette in the response
  await colorApi.validateResponseStructure("green");
});

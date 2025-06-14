import { test, request } from "@playwright/test";
import { DogApi } from "../pages/dog_api.page";

test("Dog CEO API - Validate random image response via POM", async () => {
  // 🟢 Step 1: Create a new API context
  const apiContext = await request.newContext();

  // 🟢 Step 2: Initialize the DogApi
  const dogApi = new DogApi(apiContext);

  // 🟢 Step 3: Send GET request to fetch a random dog image
  await dogApi.getRandomImageResponse();

  // 🟢 Step 4: Verify that the response status is 200 OK
  await dogApi.validateResponseStatus();

  // 🟢 Step 5: Validate the structure of the JSON response
  // - Should include 'message' (the image URL)
  // - Should include 'status' = 'success'
  await dogApi.validateImageStructure();

  // 🟢 Step 6: Validate that the image URL is in correct format
  // - Must start with https and end with a common image extension
  await dogApi.validateImageUrlFormat();
});

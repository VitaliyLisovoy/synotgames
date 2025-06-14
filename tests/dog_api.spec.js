import { test, expect, request } from "@playwright/test";

test("Dog CEO API - random image returns 200 and valid image URL", async () => {
  // Create request context
  const apiContext = await request.newContext();

  // Send GET request
  const response = await apiContext.get(
    "https://dog.ceo/api/breeds/image/random"
  );

  // ✅ 1. Check status code is 200
  expect(response.status()).toBe(200);

  // ✅ 2. Parse JSON response and validate image URL
  const body = await response.json();
  expect(body).toHaveProperty("message");
  expect(body).toHaveProperty("status", "success");

  // Check image URL format
  const imageUrl = body.message;
  console.log("🐶 Image URL:", imageUrl);

  // Very basic image URL check (ends with image extension)
  expect(imageUrl).toMatch(/^https:\/\/.*\.(jpg|jpeg|png|gif)$/i);
});

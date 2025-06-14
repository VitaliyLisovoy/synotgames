import { test, expect, request } from "@playwright/test";

test('ColorMagic API - Validate structure of palette search for "green"', async () => {
  const apiContext = await request.newContext();

  // Send GET request to ColorMagic API with q=green
  const response = await apiContext.get(
    "https://colormagic.app/api/palette/search?q=green"
  );

  // ✅ 1. Status code check
  expect(response.status()).toBe(200);

  // ✅ 2. Parse response
  const body = await response.json();

  // ✅ 3. Confirm it's a non-empty array
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  // ✅ 4. Validate each palette
  for (const palette of body) {
    // Check keys
    expect(palette).toHaveProperty("id");
    expect(palette).toHaveProperty("colors");
    expect(palette).toHaveProperty("tags");
    expect(palette).toHaveProperty("text");
    expect(palette).toHaveProperty("likesCount");
    expect(palette).toHaveProperty("normalizedHash");
    expect(palette).toHaveProperty("createdAt");

    // Validate color values
    expect(Array.isArray(palette.colors)).toBe(true);
    for (const color of palette.colors) {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/); // hex format
    }

    // Optional: Validate "green" is among tags
    expect(Array.isArray(palette.tags)).toBe(true);
    const tagsLower = palette.tags.map((tag) => tag.toLowerCase());
    expect(tagsLower).toContain("green");
  }

  console.log(`✅ Tested ${body.length} palettes successfully.`);
});

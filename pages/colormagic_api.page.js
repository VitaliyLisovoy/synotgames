import { expect, test } from "@playwright/test";

export class ColorMagicApi {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.response = null;
    this.body = null;
  }

  async searchPaletteByColor(color) {
    const url = `https://colormagic.app/api/palette/search?q=${encodeURIComponent(
      color
    )}`;
    this.response = await this.apiContext.get(url);
    this.body = await this.response.json();
  }

  async validateResponseStatus() {
    expect(this.response.status()).toBe(200);
  }

  async validateResponseStructure(expectedTag) {
    const palettes = this.body;

    expect(Array.isArray(palettes)).toBe(true);
    expect(palettes.length).toBeGreaterThan(0);

    for (const palette of palettes) {
      expect(palette).toHaveProperty("id");
      expect(palette).toHaveProperty("colors");
      expect(palette).toHaveProperty("tags");
      expect(palette).toHaveProperty("text");
      expect(palette).toHaveProperty("likesCount");
      expect(palette).toHaveProperty("normalizedHash");
      expect(palette).toHaveProperty("createdAt");

      expect(Array.isArray(palette.colors)).toBe(true);
      for (const hex of palette.colors) {
        expect(hex).toMatch(/^#[0-9a-fA-F]{6}$/);
      }

      expect(Array.isArray(palette.tags)).toBe(true);
      const tagsLower = palette.tags.map((t) => t.toLowerCase());
      expect(tagsLower).toContain(expectedTag.toLowerCase());
    }

    console.log(`✅ Tested ${palettes.length} palettes for "${expectedTag}"`);
  }
}

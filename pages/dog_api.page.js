import { expect, test } from "@playwright/test";

export class DogApi {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.baseUrl = "https://dog.ceo/api";
  }

  async getRandomImageResponse() {
    const response = await this.apiContext.get(
      `${this.baseUrl}/breeds/image/random`
    );
    this.response = response;
    return response;
  }

  async validateResponseStatus() {
    expect(this.response.status()).toBe(200);
  }

  async validateImageStructure() {
    const body = await this.response.json();
    this.body = body;

    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("status", "success");
  }

  async validateImageUrlFormat() {
    const imageUrl = this.body.message;
    console.log("🐶 Image URL:", imageUrl);

    expect(imageUrl).toMatch(/^https:\/\/.*\.(jpg|jpeg|png|gif)$/i);
  }
}

import { expect, test } from "@playwright/test";

export class DogApi {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.baseUrl = "https://dog.ceo/api";
  }

  async getRandomImageResponse() {
    await test.step("Send GET request to fetch a random dog image", async () => {
      const response = await this.apiContext.get(
        `${this.baseUrl}/breeds/image/random`
      );
      this.response = response;
      return response;
    });
  }

  async validateResponseStatus() {
    await test.step("Verify that the response status is 200 OK", async () => {
      expect(this.response.status()).toBe(200);
    });
  }

  async validateImageStructure() {
    await test.step("Validate the structure of the JSON response", async () => {
      const body = await this.response.json();
      this.body = body;

      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("status", "success");
    });
  }

  async validateImageUrlFormat() {
    await test.step("Validate that the image URL is in correct format", async () => {
      const imageUrl = this.body.message;
      console.log("🐶 Image URL:", imageUrl);

      expect(imageUrl).toMatch(/^https:\/\/.*\.(jpg|jpeg|png|gif)$/i);
    });
  }
}

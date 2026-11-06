import { describe, expect, it } from "bun:test";
import app from "../src/index";

describe("Landing Page GET /", () => {
  it("should respond with status 200 and text/html content type", async () => {
    const res = await app.fetch(new Request("http://localhost/"));
    expect(res.status).toBe(200);
    const contentType = res.headers.get("content-type");
    expect(contentType).toBeTruthy();
    expect(contentType).toContain("text/html");
  });

  it("should contain semantic HTML tags and responsive viewport meta", async () => {
    const res = await app.fetch(new Request("http://localhost/"));
    const html = await res.text();
    expect(html).toContain("<header>");
    expect(html).toContain("<main>");
    expect(html).toContain("<section");
    expect(html).toContain("<footer>");
    expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    expect(html).toContain(":root");
    expect(html).toContain("Ridgewood Retreats");
  });
});

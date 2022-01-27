import { render, screen } from "@testing-library/react";
import puppeteer from "puppeteer";
import App from "../App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("Caltulator test", () => {
  let browser = null;
  let page;

  test("Should type numbers", async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 40,
      args: ["--window-size=1920,1080"]
    });
    page = await browser.newPage();

    await page.goto("http://localhost:3000/");
    await page.click("button#three");
    await page.click("button#one");

    const finalText = await page.$eval("#display", (el) => el.textContent);
    expect(finalText).toBe("31");
  }, 25000);

  test("Should type operators", async () => {
    // await page.goto("http://localhost:3000/");
    await page.click("button#subtract");
    // await page.click("button#one");

    const finalText = await page.$eval("#display", (el) => el.textContent);
    expect(finalText).toBe("-");
  }, 25000);

  test("Should type decimals", async () => {
    // await page.goto("http://localhost:3000/");
    await page.click("button#decimal");
    await page.click("button#decimal");
    await page.click("button#five");

    const finalText = await page.$eval("#display", (el) => el.textContent);
    expect(finalText).toBe("0.5");
  }, 25000);

  test("Should evaluate", async () => {
    // await page.goto("http://localhost:3000/");
    await page.click("button#equals");

    const finalText = await page.$eval("#display", (el) => el.textContent);
    expect(finalText).toBe("30.5");
  }, 25000);
});

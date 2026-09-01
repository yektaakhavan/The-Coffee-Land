import { describe, it, expect } from "vitest";
import calculateFinalPrice from "./calculateFinalPrice";

describe("calculateFinalPrice", () => {
  it("returns the same price when discount is 0", () => {
    expect(calculateFinalPrice(100000, 0)).toBe(100000);
  });

  it("applies a percentage discount correctly", () => {
    expect(calculateFinalPrice(100000, 20)).toBe(80000);
  });

  it("returns 0 when discount is 100%", () => {
    expect(calculateFinalPrice(50000, 100)).toBe(0);
  });

  it("handles decimal discount percentages", () => {
    expect(calculateFinalPrice(200000, 12.5)).toBe(175000);
  });

  it("returns 0 when base price is 0, regardless of discount", () => {
    expect(calculateFinalPrice(0, 30)).toBe(0);
  });

  it("clamps negative discount to 0 instead of increasing the price", () => {
    expect(calculateFinalPrice(100000, -10)).toBe(100000);
  });

  it("clamps discount above 100 to 100", () => {
    expect(calculateFinalPrice(100000, 150)).toBe(0);
  });

  it("treats invalid (NaN) inputs as 0 instead of throwing", () => {
    expect(calculateFinalPrice("abc", "xyz")).toBe(0);
  });
});

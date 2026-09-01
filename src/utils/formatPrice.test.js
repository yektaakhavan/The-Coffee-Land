import { describe, it, expect } from "vitest";
import formatPrice from "./formatPrice";

describe("formatPrice", () => {
  it("formats a number with Persian thousand separators and the currency suffix", () => {
    expect(formatPrice(150000)).toBe("۱۵۰٬۰۰۰ تومان");
  });

  it("formats zero correctly", () => {
    expect(formatPrice(0)).toBe("۰ تومان");
  });

  it("accepts a numeric string and still formats it", () => {
    expect(formatPrice("250000")).toBe("۲۵۰٬۰۰۰ تومان");
  });

  it("formats small numbers without separators", () => {
    expect(formatPrice(500)).toBe("۵۰۰ تومان");
  });
});

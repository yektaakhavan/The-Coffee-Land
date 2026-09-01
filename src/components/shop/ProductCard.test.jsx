import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

function renderCard(product) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>,
  );
}

const baseProduct = {
  name: "کلمبیا سوپریمو",
  slug: "colombia-supremo",
  images: ["/images/colombia.jpg"],
  basePrice: 100000,
  discountPercent: 0,
  inventory: { stock: 5 },
  rating: 4,
  reviewCount: 10,
  flavorNotes: ["شکلاتی", "میوه‌ای"],
};

describe("ProductCard", () => {
  it("renders the product name and formatted base price when there is no discount", () => {
    renderCard(baseProduct);

    expect(screen.getByText("کلمبیا سوپریمو")).toBeInTheDocument();
    expect(screen.getByText(/۱۰۰٬۰۰۰ تومان/)).toBeInTheDocument();
  });

  it("shows both the crossed-out base price and the discounted final price when discounted", () => {
    renderCard({ ...baseProduct, discountPercent: 20 });

    expect(screen.getByText(/۱۰۰٬۰۰۰ تومان/)).toBeInTheDocument(); // original, struck-through
    expect(screen.getByText(/۸۰٬۰۰۰ تومان/)).toBeInTheDocument(); // final price
    expect(screen.getByText("%20")).toBeInTheDocument(); // discount badge
  });

  it("shows an out-of-stock badge when stock is 0", () => {
    renderCard({ ...baseProduct, inventory: { stock: 0 } });

    expect(screen.getByText("ناموجود")).toBeInTheDocument();
  });

  it("marks the product image for lazy loading", () => {
    renderCard(baseProduct);

    const image = screen.getByAltText("کلمبیا سوپریمو");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("links to the product detail page using the product slug", () => {
    renderCard(baseProduct);

    const link = screen.getByRole("link", { name: "مشاهده محصول" });
    expect(link).toHaveAttribute("href", "/product/colombia-supremo");
  });
});

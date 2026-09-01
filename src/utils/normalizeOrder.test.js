import { describe, it, expect } from "vitest";
import normalizeOrder from "./normalizeOrder";

describe("normalizeOrder", () => {
  it("normalizes a real checkout order (object customer)", () => {
    const checkoutOrder = {
      id: 1,
      orderNumber: "ORD-1001",
      customer: { fullName: "Ali Akbari", phone: "0912...", email: "a@a.com" },
      createdAt: "2026-08-01T10:00:00.000Z",
      totalPrice: 120000,
      status: "pending",
      items: [{ id: "p1", name: "Coffee", quantity: 2, finalPrice: 60000 }],
      deliveryMethod: "post",
      paymentMethod: "online",
    };

    const result = normalizeOrder(checkoutOrder);

    expect(result.customerName).toBe("Ali Akbari");
    expect(result.customerDetails).toEqual(checkoutOrder.customer);
    expect(result.date).toBe("2026-08-01");
    expect(result.total).toBe(120000);
    expect(result.source).toBe("checkout");
    expect(result.items[0]).toEqual({
      id: "p1",
      name: "Coffee",
      quantity: 2,
      price: 60000,
    });
  });

  it("falls back to a guest label when checkout order has no fullName", () => {
    const checkoutOrder = {
      id: 2,
      customer: {},
      createdAt: "2026-08-02T00:00:00.000Z",
      totalPrice: 50000,
      status: "pending",
      items: [],
    };

    const result = normalizeOrder(checkoutOrder);

    expect(result.customerName).toBe("مشتری مهمان");
  });

  it("normalizes a demo/seed order (string customer)", () => {
    const demoOrder = {
      id: 3,
      orderNumber: "DEMO-3",
      customer: "Sara Ahmadi",
      date: "2026-07-15",
      total: 90000,
      status: "delivered",
      items: [{ id: "p2", name: "Tea", quantity: 1, price: 30000 }],
    };

    const result = normalizeOrder(demoOrder);

    expect(result.customerName).toBe("Sara Ahmadi");
    expect(result.customerDetails).toBeNull();
    expect(result.date).toBe("2026-07-15");
    expect(result.total).toBe(90000);
    expect(result.source).toBe("demo");
  });

  it("defaults total to 0 when missing", () => {
    const demoOrder = { id: 4, customer: "Guest", date: "2026-07-01", items: [] };
    expect(normalizeOrder(demoOrder).total).toBe(0);
  });

  it("uses item.finalPrice over item.price when both exist", () => {
    const checkoutOrder = {
      id: 5,
      customer: { fullName: "X" },
      createdAt: "2026-08-03T00:00:00.000Z",
      totalPrice: 10000,
      items: [{ id: "p3", name: "Mug", quantity: 1, price: 20000, finalPrice: 15000 }],
    };
    expect(normalizeOrder(checkoutOrder).items[0].price).toBe(15000);
  });
});

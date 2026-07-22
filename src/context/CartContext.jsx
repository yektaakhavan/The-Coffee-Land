import { createContext, useEffect, useMemo, useState } from "react";

import calculateFinalPrice from "../utils/calculateFinalPrice.js";

export const CartContext = createContext();

const FREE_SHIPPING_LIMIT = 500000;
const SHIPPING_COST = 50000;

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save Cart

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add To Cart

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    const finalPrice = calculateFinalPrice(
      Number(product.basePrice ?? 0),
      Number(product.discountPercent ?? 0),
    );

    const stock = product.inventory?.stock ?? 0;

    const cartProduct = {
      id: product.id,

      name: product.name,

      slug: product.slug,

      images: product.images ?? [],

      origin: product.origin ?? "",

      roastLevel: product.roastLevel ?? "",

      basePrice: Number(product.basePrice ?? 0),

      discountPercent: Number(product.discountPercent ?? 0),

      finalPrice,

      stock,

      selectedSize,

      quantity,
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) => {
          if (item.id !== product.id) return item;

          return {
            ...item,

            quantity: Math.min(item.quantity + quantity, item.stock),
          };
        });
      }

      return [...prev, cartProduct];
    });
  };

  // Increase Quantity

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.quantity >= item.stock) return item;

        return {
          ...item,

          quantity: item.quantity + 1,
        };
      }),
    );
  };

  // Decrease Quantity

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return item;

        if (item.quantity === 1) return [];

        return {
          ...item,

          quantity: item.quantity - 1,
        };
      }),
    );
  };

  // Remove Item

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear Cart

  const clearCart = () => {
    setCartItems([]);
  };

  // Total Items

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Subtotal

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,

      0,
    );
  }, [cartItems]);

  // Discount

  const totalDiscount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.basePrice - item.finalPrice) * item.quantity,

      0,
    );
  }, [cartItems]);

  // Shipping

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;

    return subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
  }, [subtotal]);

  // Total Price

  const totalPrice = useMemo(() => {
    return subtotal + shipping;
  }, [subtotal, shipping]);

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart,

        subtotal,

        totalDiscount,

        shipping,

        totalPrice,

        totalItems,

        FREE_SHIPPING_LIMIT,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

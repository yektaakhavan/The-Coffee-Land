import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

const FREE_SHIPPING_LIMIT = 500000;
const SHIPPING_COST = 50000;

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // =============================
  // Load Cart
  // =============================

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // =============================
  // Save Cart
  // =============================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // =============================
  // Add To Cart
  // =============================

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        if (exist.quantity >= exist.stock) return prev;

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =============================
  // Increase Quantity
  // =============================

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

  // =============================
  // Decrease Quantity
  // =============================

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

  // =============================
  // Remove Item
  // =============================

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // =============================
  // Clear Cart
  // =============================

  const clearCart = () => {
    setCartItems([]);
  };

  // =============================
  // Total Items
  // =============================

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // =============================
  // Subtotal
  // =============================

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0,
    );
  }, [cartItems]);

  // =============================
  // Discount
  // =============================

  const totalDiscount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.basePrice - item.finalPrice) * item.quantity,
      0,
    );
  }, [cartItems]);

  // =============================
  // Shipping
  // =============================

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;

    return subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
  }, [subtotal]);

  // =============================
  // Total
  // =============================

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

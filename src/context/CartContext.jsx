import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ================= Load Cart =================

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // ================= Save Cart =================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ================= Add =================

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
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

  // ================= Increase =================

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // ================= Decrease =================

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

  // ================= Remove =================

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ================= Clear =================

  const clearCart = () => {
    setCartItems([]);
  };

  // ================= Totals =================

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0,
    );
  }, [cartItems]);

  const totalDiscount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.basePrice - item.finalPrice) * item.quantity,
      0,
    );
  }, [cartItems]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;

    return subtotal >= 500000 ? 0 : 50000;
  }, [subtotal]);

  const totalPrice = useMemo(() => {
    return subtotal + shipping;
  }, [subtotal, shipping]);

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,
        removeFromCart,
        clearCart,

        increaseQuantity,
        decreaseQuantity,

        totalItems,
        subtotal,
        totalDiscount,
        shipping,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

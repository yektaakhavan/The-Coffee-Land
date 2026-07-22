import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: crypto.randomUUID(),

      orderNumber: "#" + Math.floor(100000 + Math.random() * 900000),

      createdAt: new Date().toISOString(),

      status: "pending",

      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;

import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save Orders

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Create Order

  const createOrder = (orderData) => {
    const newOrder = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),

      orderNumber: "#" + Math.floor(100000 + Math.random() * 900000),

      createdAt: new Date().toISOString(),

      status: "pending",

      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  // Get Order By Id

  const getOrderById = (id) => {
    return orders.find((order) => order.id === id);
  };

  // Clear Orders (for testing)

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,

        createOrder,

        getOrderById,

        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;

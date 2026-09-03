import { createContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";

export const OrderContext = createContext();

// The API returns Postgres rows (snake_case columns). The rest of the
// app — normalizeOrder.js, OrderSuccessPage, admin order pages — expects
// camelCase. This adapter bridges the two without touching every page.
function toLegacyOrder(apiOrder) {
  return {
    id: apiOrder.id,
    orderNumber: apiOrder.order_number,
    customer: apiOrder.customer,
    createdAt: apiOrder.created_at,
    deliveryMethod: apiOrder.delivery_method,
    paymentMethod: apiOrder.payment_method,
    items: (apiOrder.items || []).map((item) => ({
      id: item.productId,
      name: item.name,
      quantity: item.quantity,
      finalPrice: item.price,
    })),
    shippingCost: Number(apiOrder.shipping_cost),
    totalPrice: Number(apiOrder.total_price),
    status: apiOrder.status,
  };
}

function getStoredRole() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth?.user?.role || null;
  } catch {
    return null;
  }
}

function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function refresh() {
    const role = getStoredRole();
    if (!role) {
      setOrders([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const apiOrders =
        role === "admin" ? await api.getAllOrders() : await api.getMyOrders();
      setOrders(apiOrders.map(toLegacyOrder));
    } catch (err) {
      setError(err.message || "خطا در دریافت سفارش‌ها");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // Re-fetch whenever the user logs in/out — "storage" covers other
    // tabs, "auth-changed" covers this same tab (storage events don't
    // fire in the tab that made the change).
    window.addEventListener("storage", refresh);
    window.addEventListener("auth-changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("auth-changed", refresh);
    };
  }, []);

  // orderData: { customer, deliveryMethod, paymentMethod, items }
  // items here are cart items (with `id` = productId, `quantity`) —
  // price is NEVER trusted from the client; the server recalculates it
  // from the product catalog.
  const createOrder = async (orderData) => {
    const payload = {
      customer: orderData.customer,
      deliveryMethod: orderData.deliveryMethod,
      paymentMethod: orderData.paymentMethod,
      items: orderData.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const apiOrder = await api.createOrder(payload);
    const legacyOrder = toLegacyOrder(apiOrder);

    setOrders((prev) => [legacyOrder, ...prev]);
    return legacyOrder;
  };

  const getOrderById = (id) => {
    return orders.find((order) => order.id === id);
  };

  const updateOrderStatus = async (id, status) => {
    await api.updateOrderStatus(id, status);
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  const deleteOrder = async (id) => {
    await api.deleteOrder(id);
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
        getOrderById,
        updateOrderStatus,
        deleteOrder,
        refresh,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;

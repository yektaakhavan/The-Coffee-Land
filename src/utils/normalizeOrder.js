// Real orders (placed via checkout) store `customer` as an object
// ({ fullName, phone, email, address, ... }) and use `totalPrice` /
// `createdAt`. Seed/demo orders (src/data/orders.js) use plain strings
// (`customer`, `total`, `date`). This helper flattens both into one
// consistent shape for the admin tables.
function normalizeOrder(order) {
  const isCheckoutOrder = typeof order.customer === "object" && order.customer !== null;

  const customerName = isCheckoutOrder
    ? order.customer.fullName || "مشتری مهمان"
    : order.customer;

  const date = isCheckoutOrder
    ? (order.createdAt || "").slice(0, 10)
    : order.date;

  const total = isCheckoutOrder ? order.totalPrice ?? 0 : order.total ?? 0;

  const items = (order.items || []).map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.finalPrice ?? item.price ?? 0,
  }));

  return {
    id: order.id,
    orderNumber: order.orderNumber || String(order.id),
    customerName,
    customerDetails: isCheckoutOrder ? order.customer : null,
    date,
    total,
    status: order.status,
    items,
    deliveryMethod: order.deliveryMethod,
    paymentMethod: order.paymentMethod,
    source: isCheckoutOrder ? "checkout" : "demo",
  };
}

export default normalizeOrder;

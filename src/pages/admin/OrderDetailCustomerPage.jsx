import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { OrderContext } from "../../context/OrderContext";

import StatusBadge from "../../components/admin/StatusBadge";

import formatPrice from "../../utils/formatPrice";
import normalizeOrder from "../../utils/normalizeOrder";

const STATUS_OPTIONS = [
  { value: "pending", label: "در انتظار" },
  { value: "processing", label: "در حال پردازش" },
  { value: "shipped", label: "ارسال شده" },
  { value: "delivered", label: "تحویل داده شده" },
  { value: "cancelled", label: "لغو شده" },
];

function OrderDetailCustomerPage() {
  const { id } = useParams();

  const { orders: checkoutOrders, updateOrderStatus } =
    useContext(OrderContext);

  const rawOrder = checkoutOrders.find((item) => String(item.id) === id);

  if (!rawOrder) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold">سفارش پیدا نشد</h2>

        <Link
          to="/admin/orders"
          className="inline-block mt-6 bg-stone-200 hover:bg-stone-300 px-5 py-3 rounded-xl transition"
        >
          بازگشت به سفارش‌ها
        </Link>
      </div>
    );
  }

  const order = normalizeOrder(rawOrder);

  return (
    <section className="space-y-8">
      {/* Header */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        flex
        justify-between
        items-center
      "
      >
        <div>
          <h1 className="text-3xl font-bold">جزئیات سفارش</h1>

          <p className="text-gray-500 mt-2">شماره سفارش: {order.orderNumber}</p>
        </div>

        <Link
          to="/admin/orders"
          className="
            bg-stone-200
            hover:bg-stone-300
            px-5
            py-3
            rounded-xl
            transition
          "
        >
          بازگشت
        </Link>
      </div>

      {/* Order Info */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        grid
        md:grid-cols-2
        gap-6
      "
      >
        <div>
          <p className="text-gray-500">مشتری</p>

          <p className="font-bold mt-2">{order.customerName}</p>
        </div>

        <div>
          <p className="text-gray-500">تاریخ</p>

          <p className="font-bold mt-2">{order.date || "—"}</p>
        </div>

        <div>
          <p className="text-gray-500">مبلغ کل</p>

          <p className="font-bold mt-2">{formatPrice(order.total)}</p>
        </div>

        <div>
          <p className="text-gray-500 mb-2">وضعیت</p>

          {order.source === "checkout" ? (
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="border border-stone-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-amber-500"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <StatusBadge status={order.status} />
          )}
        </div>

        {order.customerDetails && (
          <>
            <div>
              <p className="text-gray-500">تلفن</p>

              <p className="font-bold mt-2" dir="ltr">
                {order.customerDetails.phone || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">ایمیل</p>

              <p className="font-bold mt-2" dir="ltr">
                {order.customerDetails.email || "—"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">آدرس</p>

              <p className="font-bold mt-2">
                {order.customerDetails.address || "—"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Products */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
      "
      >
        <h2 className="text-xl font-bold mb-6">محصولات سفارش</h2>

        <div className="space-y-4">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="
                flex
                justify-between
                items-center
                bg-stone-50
                rounded-2xl
                p-5
              "
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>

                <p className="text-gray-500 mt-1">تعداد: {item.quantity}</p>
              </div>

              <span className="font-bold">{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrderDetailCustomerPage;

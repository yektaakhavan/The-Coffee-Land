import { Link, useParams } from "react-router-dom";

import orders from "../../data/orders";

import StatusBadge from "../../components/admin/StatusBadge";

import formatPrice from "../../utils/formatPrice";

function OrderDetailCustomerPage() {
  const { id } = useParams();

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">سفارش پیدا نشد</h2>
      </div>
    );
  }

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

          <p className="text-gray-500 mt-2">شماره سفارش: {order.id}</p>
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

          <p className="font-bold mt-2">{order.customer}</p>
        </div>

        <div>
          <p className="text-gray-500">تاریخ</p>

          <p className="font-bold mt-2">{order.date}</p>
        </div>

        <div>
          <p className="text-gray-500">مبلغ کل</p>

          <p className="font-bold mt-2">{formatPrice(order.total)}</p>
        </div>

        <div>
          <p className="text-gray-500 mb-2">وضعیت</p>

          <StatusBadge status={order.status} />
        </div>
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

import { Link, useParams } from "react-router-dom";

import customers from "../../data/customers";
import orders from "../../data/orders";

import StatusBadge from "../../components/admin/StatusBadge";
import formatPrice from "../../utils/formatPrice";

function CustomerProfilePage() {
  const { id } = useParams();

  const customer = customers.find((item) => item.id === Number(id));

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">مشتری پیدا نشد</h2>
      </div>
    );
  }

  const customerOrders = orders.filter(
    (order) => order.customer === customer.name,
  );

  const totalPurchase = customerOrders.reduce(
    (sum, order) => sum + order.total,
    0,
  );

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
          <h1 className="text-3xl font-bold">پروفایل مشتری</h1>

          <p className="text-gray-500 mt-2">مدیریت اطلاعات مشتری</p>
        </div>

        <Link
          to="/admin/customers"
          className="
            px-5
            py-3
            rounded-xl
            bg-stone-200
            hover:bg-stone-300
            transition
          "
        >
          بازگشت
        </Link>
      </div>

      {/* Customer Information */}

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
          <p className="text-gray-500">نام مشتری</p>

          <h3 className="font-bold mt-2">{customer.name}</h3>
        </div>

        <div>
          <p className="text-gray-500">ایمیل</p>

          <h3 className="font-bold mt-2">{customer.email}</h3>
        </div>

        <div>
          <p className="text-gray-500">شماره تماس</p>

          <h3 className="font-bold mt-2">{customer.phone}</h3>
        </div>

        <div>
          <p className="text-gray-500 mb-2">وضعیت</p>

          <StatusBadge status={customer.status} />
        </div>

        <div>
          <p className="text-gray-500">تعداد سفارش‌ها</p>

          <h3 className="font-bold mt-2">{customer.ordersCount}</h3>
        </div>

        <div>
          <p className="text-gray-500">مجموع خرید</p>

          <h3 className="font-bold mt-2">{formatPrice(totalPurchase)}</h3>
        </div>
      </div>

      {/* Orders */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
        "
      >
        <h2 className="text-xl font-bold mb-6">سفارش‌های مشتری</h2>

        {customerOrders.length === 0 ? (
          <p className="text-gray-500">هنوز سفارشی ثبت نشده است.</p>
        ) : (
          <div className="space-y-4">
            {customerOrders.map((order) => (
              <div
                key={order.id}
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
                  <p className="font-bold">{order.id}</p>

                  <p className="text-gray-500 mt-1">{order.date}</p>
                </div>

                <div className="text-left">
                  <p className="font-bold">{formatPrice(order.total)}</p>

                  <div className="mt-2">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomerProfilePage;

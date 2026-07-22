import { Link, Navigate, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaHome,
  FaReceipt,
} from "react-icons/fa";

import formatPrice from "../../utils/formatPrice.js";

import {
  deliveryLabels,
  paymentLabels,
  statusLabels,
} from "../../constants/orderOptions";

function OrderSuccessPage() {
  const { state } = useLocation();

  if (!state?.order) {
    return <Navigate to="/" replace />;
  }

  const { order } = state;

  return (
    <section className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-10 px-8">
            <div className="flex justify-center mb-5">
              <FaCheckCircle className="text-7xl" />
            </div>

            <h1 className="text-4xl font-black text-center">
              سفارش شما با موفقیت ثبت شد
            </h1>

            <p className="text-center mt-3 text-green-100">
              از خرید شما سپاسگزاریم 🌿
            </p>
          </div>

          {/* Body */}

          <div className="p-8">
            <div className="space-y-5">
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">شماره سفارش</span>

                <strong>{order.orderNumber}</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">تاریخ سفارش</span>

                <strong>
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">وضعیت سفارش</span>

                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
                  {statusLabels[order.status]}
                </span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">نام گیرنده</span>

                <strong>{order.customer.fullName}</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">شماره تماس</span>

                <strong>{order.customer.phone}</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">روش ارسال</span>

                <strong>{deliveryLabels[order.deliveryMethod]}</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">روش پرداخت</span>

                <strong>{paymentLabels[order.paymentMethod]}</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">تعداد کالا</span>

                <strong>{order.items.length}</strong>
              </div>

              <div className="flex justify-between text-xl font-black text-amber-700 pt-4">
                <span>مبلغ قابل پرداخت</span>

                <span>{formatPrice(order.totalPrice)}</span>
              </div>
            </div>

            {/* Buttons */}

            <div className="grid md:grid-cols-2 gap-5 mt-10">
              <Link
                to="/"
                className="flex items-center justify-center gap-3 bg-amber-700 hover:bg-amber-800 text-white py-4 rounded-2xl transition"
              >
                <FaHome />
                بازگشت به خانه
              </Link>

              <Link
                to="/shop"
                // to="/dashboard/orders"
                className="flex items-center justify-center gap-3 border-2 border-amber-700 text-amber-700 hover:bg-amber-50 py-4 rounded-2xl transition"
              >
                <FaShoppingBag />
                مشاهده سفارش‌ها
              </Link>
            </div>

            <div className="mt-10 flex justify-center items-center gap-2 text-gray-500">
              <FaReceipt />

              <span>رسید سفارش شما با موفقیت ثبت شد.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccessPage;

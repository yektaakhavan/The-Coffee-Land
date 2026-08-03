import { Link } from "react-router-dom";
import { FaCheckCircle, FaLock } from "react-icons/fa";

function PaymentPage() {
  return (
    <div className="bg-[#F5EFE2] min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-sm border border-amber-50 p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-800 text-3xl flex items-center justify-center mb-6">
          <FaLock />
        </div>

        <h1 className="text-xl font-extrabold text-stone-800 mb-3">
          درگاه پرداخت (نسخه نمایشی)
        </h1>

        <p className="text-stone-500 leading-7 mb-8">
          در نسخه واقعی این پروژه، کاربر در این مرحله به درگاه بانکی منتقل
          می‌شود. در حال حاضر پرداخت‌ها به صورت آزمایشی و بلافاصله پس از ثبت
          سفارش تکمیل می‌شوند.
        </p>

        <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-2xl py-3 mb-8 text-sm font-semibold">
          <FaCheckCircle />
          پرداخت با موفقیت شبیه‌سازی شد
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center justify-center w-full bg-amber-800 hover:bg-amber-700 text-white font-bold py-3.5 rounded-2xl transition"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    </div>
  );
}

export default PaymentPage;

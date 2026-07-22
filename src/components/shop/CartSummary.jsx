import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice.js";

function CartSummary({
  subtotal,
  totalDiscount,
  shipping,
  totalPrice,
  freeShippingLimit,
}) {
  const progress = Math.min((subtotal / freeShippingLimit) * 100, 100);

  const remaining = Math.max(freeShippingLimit - subtotal, 0);

  return (
    <div className="sticky top-24">
      <div className="rounded-3xl bg-white shadow-xl border border-stone-200 overflow-hidden">
        {/* Header */}

        <div className="bg-gradient-to-r from-amber-800 to-orange-700 text-white p-5">
          <h2 className="text-xl font-bold">خلاصه سفارش</h2>
        </div>

        {/* Free Shipping */}

        <div className="p-6 border-b">
          {subtotal < freeShippingLimit ? (
            <>
              <p className="text-sm text-gray-600 leading-7">
                🚚 فقط
                <span className="mx-1 font-bold text-amber-700">
                  {formatPrice(remaining)}
                </span>
                تا ارسال رایگان باقی مانده است.
              </p>

              <div className="mt-4 h-3 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </>
          ) : (
            <div className="bg-green-100 border border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-700">🎉 تبریک!</p>

              <p className="text-green-600 mt-1">ارسال سفارش شما رایگان شد.</p>
            </div>
          )}
        </div>

        {/* Price Details */}

        <div className="p-6 space-y-5">
          <div className="flex justify-between">
            <span className="text-gray-500">مبلغ کالاها</span>

            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">تخفیف</span>

            <span className="text-green-600 font-semibold">
              - {formatPrice(totalDiscount)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">هزینه ارسال</span>

            <span className="font-semibold">
              {shipping === 0 ? "رایگان" : formatPrice(shipping)}
            </span>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">مبلغ نهایی</span>

            <span className="text-2xl font-extrabold text-amber-900">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* Button */}

        <div className="p-6 pt-0">
          <Link
            to="/checkout"
            className="
              block
              text-center
              rounded-2xl
              bg-gradient-to-r
              from-amber-800
              to-orange-700
              text-white
              py-4
              font-bold
              hover:scale-[1.02]
              transition
              duration-300
              shadow-lg
            "
          >
            ادامه فرایند خرید
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;

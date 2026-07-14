import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import formatPrice from "../../utils/formatPrice";

function CheckoutSummary() {
  const { subtotal, shipping, totalDiscount, totalPrice } =
    useContext(CartContext);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">خلاصه سفارش</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>مبلغ کالاها</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>تخفیف</span>
          <span>{formatPrice(totalDiscount)}</span>
        </div>

        <div className="flex justify-between">
          <span>ارسال</span>
          <span>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>قابل پرداخت</span>

          <span className="text-amber-800">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <button
        className="
          mt-8
          w-full
          bg-green-600
          hover:bg-green-700
          text-white
          py-4
          rounded-2xl
          font-bold
          transition
        "
      >
        پرداخت
      </button>
    </div>
  );
}

export default CheckoutSummary;

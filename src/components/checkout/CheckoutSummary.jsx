import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

import formatPrice from "../../utils/formatPrice.js";

function CheckoutSummary() {
  const { cartItems, subtotal, shipping, totalDiscount, totalPrice } =
    useContext(CartContext);

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      sticky
      top-24
    "
    >
      <h2
        className="
        text-xl
        font-bold
        text-amber-900
        mb-6
      "
      >
        خلاصه سفارش
      </h2>

      {/* Products */}

      <div
        className="
        space-y-4
        mb-6
      "
      >
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="
                flex
                items-center
                justify-between
                border-b
                pb-3
              "
          >
            <div>
              <p
                className="
                  font-semibold
                  text-stone-800
                "
              >
                {item.name}
              </p>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                تعداد: {item.quantity}
              </p>
            </div>

            <span
              className="
                font-bold
              "
            >
              {formatPrice(item.finalPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>مبلغ کالاها</span>

          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>تخفیف</span>

          <span
            className="
            text-green-600
          "
          >
            {formatPrice(totalDiscount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>ارسال</span>

          <span>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
        </div>

        <hr />

        <div
          className="
          flex
          justify-between
          text-xl
          font-bold
        "
        >
          <span>قابل پرداخت</span>

          <span
            className="
            text-amber-800
          "
          >
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;

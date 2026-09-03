import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { checkoutSchema } from "../../validation/checkoutSchema";

import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";

import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { useToast } from "../../context/ToastContext";

function CheckoutForm() {
  const [deliveryMethod, setDeliveryMethod] = useState("post");

  const [paymentMethod, setPaymentMethod] = useState("online");

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),

    mode: "onTouched",
  });

  const navigate = useNavigate();

  const {
    cartItems,

    clearCart,

    subtotal,
  } = useContext(CartContext);

  const { createOrder } = useContext(OrderContext);

  const inputClass = (error) =>
    `
      w-full
      rounded-xl
      p-4
      outline-none
      transition
      border

      ${
        error
          ? "border-red-500 focus:ring-2 focus:ring-red-300"
          : "border-gray-300 focus:ring-2 focus:ring-amber-500"
      }

    `;

  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data) => {
    if (cartItems.length === 0) return;

    setSubmitError(null);

    try {
      const newOrder = await createOrder({
        customer: data,
        deliveryMethod,
        paymentMethod,
        items: cartItems,
      });

      clearCart();

      showToast("سفارش شما با موفقیت ثبت شد ✅");

      navigate("/order-success", {
        state: {
          order: newOrder,
        },
      });
    } catch (err) {
      setSubmitError(err.message || "ثبت سفارش با خطا مواجه شد");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        text-amber-900
        mb-8
      "
      >
        اطلاعات گیرنده
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        gap-5
      "
      >
        <div>
          <input
            {...register("fullName")}
            placeholder="نام و نام خانوادگی"
            className={inputClass(errors.fullName)}
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("phone")}
            placeholder="شماره موبایل"
            className={inputClass(errors.phone)}
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="ایمیل"
            className={inputClass(errors.email)}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("postalCode")}
            placeholder="کد پستی"
            className={inputClass(errors.postalCode)}
          />

          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-2">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <textarea
          rows={5}
          {...register("address")}
          placeholder="آدرس کامل"
          className={inputClass(errors.address)}
        />

        {errors.address && (
          <p className="text-red-500 text-sm mt-2">{errors.address.message}</p>
        )}
      </div>

      <DeliveryMethod
        selected={deliveryMethod}
        setSelected={setDeliveryMethod}
      />

      <PaymentMethod selected={paymentMethod} setSelected={setPaymentMethod} />

      {submitError && (
        <p className="text-red-600 text-sm text-center mb-3">{submitError}</p>
      )}

      <button
        type="submit"
        className="
          mt-8
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-amber-700
          to-amber-600
          hover:from-amber-800
          hover:to-amber-700
          text-white
          font-bold
          text-lg
          shadow-lg
          transition
        "
      >
        ثبت سفارش
      </button>
    </form>
  );
}

export default CheckoutForm;

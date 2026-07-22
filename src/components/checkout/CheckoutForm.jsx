import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema } from "../../validation/checkoutSchema";

import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";

function CheckoutForm() {
  const [deliveryMethod, setDeliveryMethod] = useState("post");
  const [paymentMethod, setPaymentMethod] = useState("online");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const { cartItems, clearCart } = useContext(CartContext);

  const { createOrder } = useContext(OrderContext);

  const inputClass = (error) =>
    `w-full rounded-xl p-4 outline-none transition border ${
      error
        ? "border-red-500 focus:ring-2 focus:ring-red-300"
        : "border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    }`;

  const onSubmit = (data) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0,
    );

    const shippingCost =
      deliveryMethod === "pickup"
        ? 0
        : deliveryMethod === "express"
          ? 90000
          : 60000;

    const totalPrice = subtotal + shippingCost;

    const newOrder = createOrder({
      customer: data,

      deliveryMethod,

      paymentMethod,

      items: cartItems,

      subtotal,

      shippingCost,

      totalPrice,
    });

    clearCart();

    navigate("/order-success", {
      state: {
        order: newOrder,
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-amber-900 mb-8">اطلاعات گیرنده</h2>

      {/* Inputs */}

      <div className="grid md:grid-cols-2 gap-5">
        {/* Full Name */}

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

        {/* Phone */}

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

        {/* Email */}

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

        {/* Postal Code */}

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

      {/* Address */}

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

      {/* Delivery */}

      <DeliveryMethod
        selected={deliveryMethod}
        setSelected={setDeliveryMethod}
      />

      {/* Payment */}

      <PaymentMethod selected={paymentMethod} setSelected={setPaymentMethod} />

      {/* Button */}

      <button
        type="submit"
        className="
          mt-8
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-amber-700
          to-orange-700
          hover:from-amber-800
          hover:to-orange-800
          text-white
          font-bold
          text-lg
          shadow-lg
          transition
          duration-300
        "
      >
        ثبت سفارش
      </button>
    </form>
  );
}

export default CheckoutForm;

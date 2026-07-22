import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

function CheckoutPage() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <section className="bg-stone-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold text-amber-900 mb-10">تکمیل سفارش</h1>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <div className="self-start">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;

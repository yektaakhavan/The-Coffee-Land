import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "../../components/shop/CartItem";
import CartSummary from "../../components/shop/CartSummary";

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    totalDiscount,
    shipping,
    totalPrice,
     FREE_SHIPPING_LIMIT,
  } = useContext(CartContext);



  // ================= Empty Cart =================

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-stone-50">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center w-full max-w-lg">
          <div className="text-7xl mb-6">🛒</div>

          <h1 className="text-3xl font-bold text-amber-900 mb-4">
            سبد خرید شما خالی است
          </h1>

          <p className="text-gray-500 mb-8">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-xl transition"
          >
            مشاهده فروشگاه
          </Link>
        </div>
      </section>
    );
  }

  // ================= Cart =================

  return (
    <section className="bg-stone-100 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold text-amber-900 mb-10">سبد خرید</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products */}

          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            ))}

            <div className="flex justify-between mt-8">
              <Link
                to="/shop"
                className="border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-6 py-3 rounded-xl transition"
              >
                ادامه خرید
              </Link>
            </div>
          </div>

          {/* Summary */}

          <CartSummary
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            shipping={shipping}
            totalPrice={totalPrice}
            freeShippingLimit={FREE_SHIPPING_LIMIT}
          />
        </div>
      </div>
    </section>
  );
}

export default CartPage;

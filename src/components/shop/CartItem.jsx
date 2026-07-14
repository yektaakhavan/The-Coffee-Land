import { FaMinus, FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";

function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const stockStatus =
    item.stock === 0
      ? {
          text: "ناموجود",
          color: "bg-red-100 text-red-600",
        }
      : item.stock <= 5
        ? {
            text: `فقط ${item.stock} عدد باقی مانده`,
            color: "bg-orange-100 text-orange-600",
          }
        : {
            text: "موجود",
            color: "bg-green-100 text-green-600",
          };

  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}

        <div className="relative w-full md:w-60 overflow-hidden">
          <img
            src={item.images?.[0] || item.image}
            alt={item.name}
            className="
              h-60
              w-full
              object-cover
              group-hover:scale-110
              transition
              duration-700
            "
          />
        </div>

        {/* Content */}

        <div className="flex-1 p-6 flex flex-col justify-between">
          {/* Top */}

          <div>
            <Link
              to={`/product/${item.slug}`}
              className="text-2xl font-bold text-stone-800 hover:text-amber-800 transition"
            >
              {item.name}
            </Link>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-stone-100 px-3 py-1 rounded-full text-sm">
                {item.origin}
              </span>

              <span className="bg-stone-100 px-3 py-1 rounded-full text-sm">
                رست {item.roastLevel}
              </span>

              <span className="bg-stone-100 px-3 py-1 rounded-full text-sm">
                {item.sizes?.[0]}
              </span>
            </div>

            <div
              className={`inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm font-medium ${stockStatus.color}`}
            >
              <FaCheckCircle />

              {stockStatus.text}
            </div>
          </div>

          {/* Bottom */}

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Quantity */}

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-stone-100
                  hover:bg-red-500
                  hover:text-white
                  transition
                "
              >
                <FaMinus className="mx-auto" />
              </button>

              <span className="text-xl font-bold w-8 text-center">
                {item.quantity}
              </span>

              <button
                disabled={item.quantity >= item.stock}
                onClick={() => increaseQuantity(item.id)}
                className={`
                  w-10
                  h-10
                  rounded-full
                  transition

                  ${
                    item.quantity >= item.stock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-amber-700 hover:bg-amber-800 text-white"
                  }
                `}
              >
                <FaPlus className="mx-auto" />
              </button>
            </div>

            {/* Price */}

            <div className="text-left">
              {item.discountPercent > 0 && (
                <p className="line-through text-gray-400 text-sm">
                  {formatPrice(item.basePrice)}
                </p>
              )}

              <p className="text-2xl font-bold text-amber-900">
                {formatPrice(item.finalPrice)}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                جمع:
                <span className="font-bold mr-1">
                  {formatPrice(item.finalPrice * item.quantity)}
                </span>
              </p>
            </div>

            {/* Remove */}

            <button
              onClick={() => {
                if (window.confirm("آیا از حذف این محصول مطمئن هستید؟")) {
                  removeFromCart(item.id);
                }
              }}
              className="
                flex
                items-center
                gap-2
                justify-center
                px-5
                py-3
                rounded-xl
                border
                border-red-300
                text-red-600
                hover:bg-red-500
                hover:text-white
                transition
              "
            >
              <FaTrash />
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

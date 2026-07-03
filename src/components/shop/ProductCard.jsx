import { Link } from "react-router-dom";
import StarRating from "../shop/StarRating";
import Badge from "./Badge";
import formatPrice from "../../utils/formatPrice";

function ProductCard({ product }) {
  return (
    <div className="group relative rounded-[30px] p-[1px] bg-gradient-to-br from-white/70 via-amber-100/40 to-orange-200/30">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-[30px] bg-amber-300/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-[30px] border border-white/50 bg-white/75 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(120,53,15,0.18)] transition duration-500">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Discount badge */}
          {product.discountPercent > 0 && (
            <div className="absolute top-0 right-4 z-20">
              <Badge type="discount">%{product.discountPercent}</Badge>
            </div>
          )}

          {/* Available Product */}
          {product.stock <= 0 && (
            <div className="absolute top-0 left-0 z-20">
              <Badge type="stock">ناموجود</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-stone-800 tracking-tight">
              {product.name}
            </h3>

            <p className="text-sm text-stone-500 mt-1">
              Premium Coffee Selection
            </p>
          </div>
          {/* Star Rating */}
          <div className="mb-4">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          {/* flavor note */}
          <div className="flex flex-wrap gap-2 mb-2">
            {product.flavorNotes.map((note, index) => (
              <Badge key={index} type="flavor">
                {note}
              </Badge>
            ))}
          </div>
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mb-4"></div>
          {/* Price */}
          <div className="flex-coloumn">
            <p>قیمت</p>
            <div className="flex justify-between items-center">
              {/* original price */}
              <p
                className={`${
                  product.discountPercent > 0
                    ? "text-gray-400 line-through text-sm"
                    : "text-amber-900 text-lg font-bold"
                }`}
              >
                {product.basePrice.toLocaleString("fa-IR")} تومان
              </p>

              {/* discounted price */}
              {product.discountPercent > 0 && (
                <p className="text-amber-900 text-lg font-bold">
                  <p>{formatPrice(product.finalPrice)}</p>
                </p>
              )}
            </div>
          </div>
          {/* Product Details */}
          <button className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-700 text-white font-medium tracking-wide shadow-[0_8px_20px_rgba(120,53,15,0.25)] hover:shadow-[0_12px_25px_rgba(120,53,15,0.35)] hover:scale-[1.02] transition duration-300">
            مشاهده
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

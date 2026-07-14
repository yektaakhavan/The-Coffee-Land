import StarRating from "./StarRating";

function ProductInfo({ product }) {
  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

        <p className="text-gray-500 mt-2">{product.description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} />

        <span className="text-amber-700 font-semibold">{product.rating}</span>

        <span className="text-gray-400">({product.reviewCount} نظر)</span>
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-stone-100 rounded-xl p-4">
          <p className="text-gray-500 text-sm">کشور مبدا</p>

          <p className="font-semibold">{product.origin}</p>
        </div>

        <div className="bg-stone-100 rounded-xl p-4">
          <p className="text-gray-500 text-sm">درجه رست</p>

          <p className="font-semibold">{product.roastLevel}</p>
        </div>

        <div className="bg-stone-100 rounded-xl p-4">
          <p className="text-gray-500 text-sm">موجودی</p>

          <p className="font-semibold">{product.stock} بسته</p>
        </div>

        <div className="bg-stone-100 rounded-xl p-4">
          <p className="text-gray-500 text-sm">دسته بندی</p>

          <p className="font-semibold">{product.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;

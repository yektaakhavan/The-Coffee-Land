import Badge from "./Badge";
import formatPrice from "../../utils/formatPrice";

function ProductPrice({ product }) {
  return (
    <div className="space-y-3">
      {/* Stock */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">وضعیت موجودی</span>

        {product.stock > 0 ? (
          <Badge type="success">موجود</Badge>
        ) : (
          <Badge type="stock">ناموجود</Badge>
        )}
      </div>

      {/* Price */}
      <div>
        <p className="text-sm text-gray-500 mb-2">قیمت</p>

        <div className="flex items-center justify-between">
          <div>
            {product.discountPercent > 0 && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.basePrice)}
              </p>
            )}

            <p className="text-2xl font-bold text-amber-900">
              {formatPrice(product.finalPrice)}
            </p>
          </div>

          {product.discountPercent > 0 && (
            <Badge type="discount">%{product.discountPercent}</Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPrice;

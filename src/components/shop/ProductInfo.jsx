import Badge from "./Badge";
import StarRating from "./StarRating";
import formatPrice from "../../utils/formatPrice";

function ProductInfo({ product }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-stone-800">{product.name}</h1>

        <p className="text-gray-500 mt-2">{product.origin}</p>
      </div>

      <StarRating rating={product.rating} count={product.reviewCount} />

      <div className="flex flex-wrap gap-2">
        {product.flavorNotes.map((note) => (
          <Badge key={note} type="flavor">
            {note}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InfoItem title="رست" value={product.roastLevel} />

        <InfoItem title="اسیدیته" value={product.acidity} />

        <InfoItem title="تلخی" value={product.bitterness} />

        <InfoItem title="بادی" value={product.body} />
      </div>

      <div className="border-t pt-6">
        <p className="text-3xl font-bold text-amber-900">
          {formatPrice(product.finalPrice)}
        </p>
      </div>
    </div>
  );
}

function InfoItem({ title, value }) {
  return (
    <div className="rounded-xl bg-stone-100 p-4">
      <p className="text-xs text-gray-500">{title}</p>

      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}

export default ProductInfo;

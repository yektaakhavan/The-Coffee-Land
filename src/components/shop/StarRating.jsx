import products from "../../data/products";

function StarRating({ rating = 0, count = 0 }) {
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span className="text-gray-500 text-sm mr-2">{rating}</span>
      {count > 0 && (
        <span className="text-gray-400 text-sm">({count} نظر)</span>
      )}
    </div>
  );
}

export default StarRating;

import { FaStar, FaRegStar } from "react-icons/fa";

function StarRating({ count = 0, rating = 0 }) {
  return (
    <div className="flex items-center gap-1">
      {/* filled stars */}
      {Array.from({ length: Math.floor(rating) }).map((_, index) => (
        <FaStar key={index} className="text-amber-500" />
      ))}
      {/* empty stars */}
      {Array.from({ length: 5 - Math.floor(rating) }).map((_, index) => (
        <FaRegStar key={index} className="text-gray-300" />
      ))}
      <p className="text-sm text-gray-500 mr-2">{rating}</p>
      {count > 0 && <p className="text-sm text-gray-400">({count} نظر)</p>}
    </div>
  );
}

export default StarRating;

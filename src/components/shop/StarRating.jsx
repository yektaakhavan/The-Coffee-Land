import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";

function StarRating({ count = 0, rating = 0 }) {
  return (
    <div className="flex items-center gap-1">
      {/* filled stars */}
      {Array.from({ length: Math.floor(rating) }).map((_, index) => (
        <MdOutlineStarPurple500 key={index} className="text-yellow-400" />
      ))}
      {/* empty stars */}
      {Array.from({ length: 5 - Math.floor(rating) }).map((_, index) => (
        <MdOutlineStarOutline key={index} className="text-gray-300" />
      ))}
      <p className="text-sm text-gray-500 mr-2">{rating}</p>
      {count > 0 && (
        <p className="text-sm text-gray-400">({count} نظر)</p>
      )}
    </div>
  );
}

export default StarRating;

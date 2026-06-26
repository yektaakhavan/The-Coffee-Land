import React from "react";
import products from "../../data/products";
import StarRating from "../shop/StarRating";
import Badge from "./Badge";

function ProductCard() {
  return (
    <div className="min-h-scree p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">
          🛒 فروشگاه قهوه
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition block"
            >
              {/* <div className="flex flex-col justify-between"> */}
              <img
                className="w-64 h-55 rounded-lg mb-3 transition"
                src={product.image}
                alt=""
              />
              <h3 className="text-amber-950 text-xl">{product.name}</h3>
              <p className="my-2">
                {/* {product.rating} */}
                <StarRating
                  rating={product.rating}
                  count={product.reviewCount}
                />
              </p>
              {/* نمایش نت‌های طعم به صورت تگ‌های جداگانه */}
              {/* <div className="flex flex-wrap gap-2 justify-end my-2">
                {product.flavorNotes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-amber-200 text-amber-800 text-xs px-3 py-1 rounded-full"
                  >
                    {note}
                  </span>
                ))}
              </div> */}

              {/* استفاده از Badge برای نت‌های طعم */}
              <div className="flex flex-wrap gap-2 justify-end my-2">
                {product.flavorNotes.map((note, index) => (
                  <Badge key={index} type="flavor">
                    {note}
                  </Badge>
                ))}
              </div>
              <hr />
              <p className=" py-2 px-3">
                {product.basePrice.toLocaleString("fa-IR")} تومان
              </p>
            </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

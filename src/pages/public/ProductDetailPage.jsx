import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useProducts } from "../../context/ProductContext";

import StarRating from "../../components/shop/StarRating";
import Badge from "../../components/shop/Badge";

import formatPrice from "../../utils/formatPrice.js";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import calculateFinalPrice from "../../utils/calculateFinalPrice.js";

function ProductDetailPage() {
  const { products } = useProducts();
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);

  console.log("slug:", slug);
  console.log("products:", products);

  const { getProductBySlug } = useProducts();

  const product = getProductBySlug(slug);

  console.log("product:", product);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold">محصول پیدا نشد 😥</h2>
      </div>
    );
  }

  // const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "");
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const totalPrice =
    calculateFinalPrice(product.basePrice, product.discountPercent) * quantity;

  return (
    <div className="bg-stone-100 min-h-screen py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}

        <div className="text-sm text-gray-500 mb-8">
          <Link to="/">خانه</Link>

          <span className="mx-2">/</span>

          <Link to="/shop">فروشگاه</Link>

          <span className="mx-2">/</span>

          <span>{product.name}</span>
        </div>

        {/* Main */}

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Images */}

          <div>
            {/* Main Image */}

            <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[550px] object-cover"
              />
            </div>

            {/* Gallery */}

            <div className="flex gap-4 mt-5">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`rounded-2xl overflow-hidden border-2 transition

                  ${
                    selectedImage === image
                      ? "border-amber-700"
                      : "border-transparent"
                  }

                  `}
                >
                  <img src={image} alt="" className="w-24 h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Information */}

          <div>
            <h1 className="text-4xl font-extrabold text-stone-800">
              {product.name}
            </h1>

            <div className="mt-4">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>

            <p className="mt-6 leading-9 text-gray-600">
              {product.description}
            </p>

            {/* Flavor */}

            <div className="flex flex-wrap gap-2 mt-6">
              {product.flavorNotes.map((note) => (
                <Badge key={note} type="flavor">
                  {note}
                </Badge>
              ))}
            </div>

            {/* Details */}

            <div className="grid grid-cols-2 gap-y-5 mt-10 bg-white rounded-3xl p-6 shadow">
              <span className="font-semibold">کشور</span>

              <span>{product.origin}</span>

              <span className="font-semibold">رست</span>

              <span>{product.roastLevel}</span>

              <span className="font-semibold">فرآوری</span>

              <span>{product.process}</span>

              <span className="font-semibold">اسیدیته</span>

              <span>{product.acidity}</span>

              <span className="font-semibold">تلخی</span>

              <span>{product.bitterness}</span>

              <span className="font-semibold">بادی</span>

              <span>{product.body}</span>
            </div>

            {/* Sizes */}

            <div className="mt-10">
              <h3 className="font-bold mb-4">انتخاب وزن</h3>

              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 rounded-xl transition

                    ${
                      selectedSize === size
                        ? "bg-amber-800 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }

                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}

            <div className="mt-10">
              <h3 className="font-bold mb-4">تعداد</h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-200"
                >
                  -
                </button>

                <span className="font-bold text-xl">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}

            <div className="mt-10">
              <p className="text-gray-500">مبلغ قابل پرداخت</p>

              <h2 className="text-4xl font-black text-amber-900 mt-2">
                {formatPrice(totalPrice)}
              </h2>
            </div>

            {/* Add Cart */}

            <button
              onClick={() => {
                addToCart(product, quantity, selectedSize);

                alert("محصول به سبد خرید اضافه شد.");
              }}
              className="w-full mt-8 bg-amber-800 hover:bg-amber-700 transition text-white py-4 rounded-2xl text-lg font-bold"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

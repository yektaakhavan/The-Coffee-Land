import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useProducts } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";

import StarRating from "../../components/shop/StarRating";
import Badge from "../../components/shop/Badge";

import formatPrice from "../../utils/formatPrice.js";
import calculateFinalPrice from "../../utils/calculateFinalPrice.js";

function ProductDetailPage() {
  const { slug } = useParams();

  const { getProductBySlug } = useProducts();

  const { addToCart } = useContext(CartContext);

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >
        <h2
          className="
          text-3xl
          font-bold
        "
        >
          محصول پیدا نشد 😥
        </h2>
      </div>
    );
  }

  const images = product.images ?? [];

  const flavorNotes = product.flavorNotes ?? [];

  const sizes = product.sizes ?? [];

  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");

  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");

  const [quantity, setQuantity] = useState(1);

  const finalPrice = calculateFinalPrice(
    Number(product.basePrice),
    Number(product.discountPercent ?? 0),
  );

  const totalPrice = finalPrice * quantity;

  return (
    <div
      className="
      bg-stone-100
      min-h-screen
      py-10
      px-5
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
      "
      >
        {/* Breadcrumb */}

        <div
          className="
          text-sm
          text-gray-500
          mb-8
        "
        >
          <Link to="/">خانه</Link>

          <span className="mx-2">/</span>

          <Link to="/shop">فروشگاه</Link>

          <span className="mx-2">/</span>

          <span>{product.name}</span>
        </div>

        <div
          className="
          grid
          lg:grid-cols-2
          gap-14
        "
        >
          {/* Gallery */}

          <div>
            <div
              className="
              rounded-3xl
              overflow-hidden
              shadow-lg
              bg-white
            "
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="
                  w-full
                  h-[550px]
                  object-cover
                "
              />
            </div>

            {images.length > 0 && (
              <div
                className="
                flex
                gap-4
                mt-5
              "
              >
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`
                          rounded-2xl
                          overflow-hidden
                          border-2

                          ${
                            selectedImage === image
                              ? "border-amber-700"
                              : "border-transparent"
                          }

                        `}
                  >
                    <img
                      src={image}
                      alt=""
                      className="
                            w-24
                            h-24
                            object-cover
                          "
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}

          <div>
            <h1
              className="
              text-4xl
              font-extrabold
              text-stone-800
            "
            >
              {product.name}
            </h1>

            <div className="mt-4">
              <StarRating
                rating={product.rating ?? 0}
                count={product.reviewCount ?? 0}
              />
            </div>

            <p
              className="
              mt-6
              leading-9
              text-gray-600
            "
            >
              {product.description}
            </p>

            <div
              className="
              flex
              flex-wrap
              gap-2
              mt-6
              min-h-[32px]
            "
            >
              {flavorNotes.map((note) => (
                <Badge key={note} type="flavor">
                  {note}
                </Badge>
              ))}
            </div>

            <div
              className="
              grid
              grid-cols-2
              gap-y-5
              mt-10
              bg-white
              rounded-3xl
              p-6
              shadow
            "
            >
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

            {sizes.length > 0 && (
              <div className="mt-10">
                <h3 className="font-bold mb-4">انتخاب وزن</h3>

                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                          px-5
                          py-3
                          rounded-xl

                          ${
                            selectedSize === size
                              ? "bg-amber-800 text-white"
                              : "bg-gray-200"
                          }

                        `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <h3 className="font-bold mb-4">تعداد</h3>

              <div
                className="
                flex
                items-center
                gap-4
              "
              >
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-gray-200
                  "
                >
                  -
                </button>

                <span className="font-bold text-xl">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-gray-200
                  "
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-gray-500">مبلغ قابل پرداخت</p>

              <h2
                className="
                text-4xl
                font-black
                text-amber-900
                mt-2
              "
              >
                {formatPrice(totalPrice)}
              </h2>
            </div>

            <button
              onClick={() => {
                addToCart(product, quantity, selectedSize);
              }}
              className="
                w-full
                mt-8
                bg-amber-800
                hover:bg-amber-700
                text-white
                py-4
                rounded-2xl
                text-lg
                font-bold
              "
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

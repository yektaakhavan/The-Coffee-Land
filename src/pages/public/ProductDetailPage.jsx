import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

import { useProducts } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

import StarRating from "../../components/shop/StarRating";
import Badge from "../../components/shop/Badge";
import Reveal from "../../components/ui/Reveal";

import formatPrice from "../../utils/formatPrice.js";
import calculateFinalPrice from "../../utils/calculateFinalPrice.js";

function ProductDetailPage() {
  const { slug } = useParams();

  const { getProductBySlug } = useProducts();

  const { addToCart } = useContext(CartContext);

  const { showToast } = useToast();

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div
        className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        gap-4
      "
      >
        <FaSadTear className="text-5xl text-amber-300" />
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          محصول پیدا نشد
        </h1>

        <Link
          to="/shop"
          className="bg-amber-800 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-2xl transition"
        >
          بازگشت به فروشگاه
        </Link>
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
      bg-[#F5EFE2]
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
          <Link to="/" className="hover:text-amber-700 transition">
            خانه
          </Link>

          <span className="mx-2">/</span>

          <Link to="/shop" className="hover:text-amber-700 transition">
            فروشگاه
          </Link>

          <span className="mx-2">/</span>

          <span>{product.name}</span>
        </div>

        <Reveal>
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
                    aria-label={`تصویر ${index + 1} محصول`}
                    className={`
                          rounded-2xl
                          overflow-hidden
                          border-2
                          transition
                          hover:opacity-80

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
                <h2 className="font-bold mb-4">انتخاب وزن</h2>

                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                          px-5
                          py-3
                          rounded-xl
                          transition

                          ${
                            selectedSize === size
                              ? "bg-amber-800 text-white"
                              : "bg-gray-200 hover:bg-amber-100"
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
              <h2 className="font-bold mb-4">تعداد</h2>

              <div
                className="
                flex
                items-center
                gap-4
              "
              >
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  aria-label="کاهش تعداد"
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-gray-200
                    hover:bg-amber-100
                    hover:text-amber-800
                    transition
                  "
                >
                  -
                </button>

                <span className="font-bold text-xl">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  aria-label="افزایش تعداد"
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-gray-200
                    hover:bg-amber-100
                    hover:text-amber-800
                    transition
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
                showToast(`«${product.name}» به سبد خرید اضافه شد`);
              }}
              className="
                w-full
                mt-8
                bg-amber-800
                hover:bg-amber-700
                hover:shadow-lg
                hover:-translate-y-0.5
                text-white
                py-4
                rounded-2xl
                text-lg
                font-bold
                transition
                duration-300
              "
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
        </Reveal>
      </div>
    </div>
  );
}

export default ProductDetailPage;

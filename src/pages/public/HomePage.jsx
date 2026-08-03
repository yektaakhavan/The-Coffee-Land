import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBlender,
  FaCoffee,
  FaFire,
  FaGift,
  FaGlobeAmericas,
  FaHeadset,
  FaMugHot,
  FaQuoteLeft,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa";

import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";

import ProductSlider from "../../components/shop/ProductSlider";
import StarRating from "../../components/shop/StarRating";
import Reveal from "../../components/ui/Reveal";

import blogPosts from "../../data/blogPosts";
import reviews from "../../data/reviews";

import heroImage from "../../assets/images/product/cup-of-coffee.jpg";
import storyImage from "../../assets/images/product/coffee-shops-coffee.png";
import ctaImage from "../../assets/images/product/coffee-time-quote.png";

const categoryIcons = {
  "single-origin": FaGlobeAmericas,
  "espresso-blend": FaMugHot,
  blend: FaBlender,
  turkish: FaFire,
  "gift-pack": FaGift,
};

function HomePage() {
  const { products } = useProducts();
  const { categories } = useCategories();

  const featuredProducts = useMemo(
    () => products.filter((product) => product.isFeatured),
    [products],
  );

  const activeCategories = useMemo(
    () => categories.filter((category) => category.status === "active"),
    [categories],
  );

  const approvedReviews = useMemo(
    () => reviews.filter((review) => review.status === "approved"),
    [],
  );

  const latestPosts = useMemo(
    () =>
      blogPosts
        .filter((post) => post.status === "published")
        .slice(0, 3),
    [],
  );

  return (
    <div className="bg-[#F5EFE2]">
      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-900 via-amber-900 to-[#F5EFE2]">
        <div
          className="
            max-w-7xl mx-auto
            px-6 py-20 md:py-28
            grid md:grid-cols-2 gap-12
            items-center
          "
        >
          <div className="text-white text-center md:text-right">
            <span
              className="
                inline-block px-4 py-1.5 mb-6
                rounded-full bg-amber-800/60 border border-amber-600/50
                text-amber-200 text-sm font-medium tracking-wide
              "
            >
              ☕ سرزمین قهوه
            </span>

            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              هر فنجان، یک سفر به دل
              <span className="text-amber-300"> مزارع قهوه </span>
              دنیا
            </h1>

            <p className="text-amber-100/80 font-light text-lg leading-8 mb-10 max-w-xl mx-auto md:mx-0">
              دانه‌های تازه‌بوداده، تک‌خاستگاه و ترکیبی، مستقیم از بهترین
              مزارع دنیا انتخاب و برای شما رست می‌شوند تا بهترین طعم را در
              خانه تجربه کنید.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/shop"
                className="
                  flex items-center gap-2
                  bg-amber-500 hover:bg-amber-400 text-amber-950
                  font-bold px-7 py-3.5 rounded-2xl
                  shadow-lg shadow-amber-900/30
                  transition
                "
              >
                خرید قهوه
                <FaArrowLeft />
              </Link>

              <Link
                to="/about"
                className="
                  px-7 py-3.5 rounded-2xl font-bold
                  border border-amber-200/40 text-amber-100
                  hover:bg-white/10 transition
                "
              >
                آشنایی با ما
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-amber-500/20 blur-3xl" />

            <img
              src={heroImage}
              alt="فنجان قهوه"
              className="
                brand-photo
                relative rounded-[36px] w-full h-[360px] md:h-[440px]
                object-cover shadow-2xl border-4 border-white/10
              "
            />

            {/* Gentle steam animation */}
            <svg
              viewBox="0 0 100 120"
              aria-hidden="true"
              className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-24 h-32 opacity-60"
            >
              <path
                d="M35 110 C 20 90, 50 80, 35 60 C 20 40, 50 30, 40 10"
                fill="none"
                stroke="#F3E9D4"
                strokeWidth="3"
                strokeLinecap="round"
                className="steam-path"
                style={{ animationDelay: "0s" }}
              />
              <path
                d="M60 110 C 45 90, 75 80, 60 60 C 45 40, 75 30, 65 10"
                fill="none"
                stroke="#F3E9D4"
                strokeWidth="3"
                strokeLinecap="round"
                className="steam-path"
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ================= Trust badges ================= */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-6 -mt-10 md:-mt-14 relative z-10">
          <div
            className="
              grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6
              bg-white rounded-3xl shadow-xl p-6 md:p-8
            "
          >
            {[
              { icon: FaShippingFast, title: "ارسال سریع", desc: "به سراسر کشور" },
              { icon: FaShieldAlt, title: "ضمانت اصالت", desc: "کیفیت تضمینی" },
              { icon: FaCoffee, title: "رست تازه", desc: "زیر ۷ روز" },
              { icon: FaHeadset, title: "پشتیبانی", desc: "همه روزه" },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center text-xl">
                  <Icon />
                </div>
                <p className="font-bold text-stone-800 text-sm md:text-base">
                  {title}
                </p>
                <p className="text-xs md:text-sm text-stone-500 font-light">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ================= Categories ================= */}
      {activeCategories.length > 0 && (
        <Reveal>
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800">
                دسته‌بندی محصولات
              </h2>
              <p className="text-stone-500 font-light mt-2">
                قهوه‌ای که به سلیقه شما نزدیک‌تر است را انتخاب کنید
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {activeCategories.map((category) => {
                const Icon = categoryIcons[category.slug] ?? FaCoffee;

                return (
                  <Link
                    key={category.id}
                    to={`/shop?category=${category.slug}`}
                    className="
                      group flex flex-col items-center justify-center gap-3
                      bg-white border border-amber-100 rounded-3xl
                      py-8 px-4 text-center
                      shadow-sm hover:shadow-xl hover:-translate-y-1
                      transition duration-300
                    "
                  >
                    <div
                      className="
                        w-14 h-14 rounded-2xl
                        bg-amber-50 text-amber-800 text-2xl
                        flex items-center justify-center
                        group-hover:bg-amber-800 group-hover:text-white
                        transition duration-300
                      "
                    >
                      <Icon />
                    </div>
                    <span className="font-bold text-stone-800">
                      {category.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </Reveal>
      )}

      {/* ================= Featured Products ================= */}
      {featuredProducts.length > 0 && (
        <Reveal>
          <section className="max-w-7xl mx-auto px-6 py-6">
            <ProductSlider products={featuredProducts} title="قهوه‌های ویژه" />

            <div className="text-center mt-6">
              <Link
                to="/shop"
                className="
                  inline-flex items-center gap-2
                  text-amber-800 font-bold
                  hover:text-amber-600 transition
                "
              >
                مشاهده همه محصولات
                <FaArrowLeft />
              </Link>
            </div>
          </section>
        </Reveal>
      )}

      {/* ================= Story ================= */}
      <Reveal>
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
            <img
              src={storyImage}
              alt="کافه سرزمین قهوه"
              className="brand-photo rounded-3xl w-full h-[340px] object-cover shadow-lg order-2 md:order-1"
            />

            <div className="order-1 md:order-2 text-center md:text-right">
              <span className="text-amber-700 font-bold">داستان ما</span>

              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800 mt-3 mb-5">
                از انتخاب دانه تا فنجان شما
              </h2>

              <p className="text-stone-600 font-light leading-8 mb-8">
                سرزمین قهوه با هدف رساندن باکیفیت‌ترین دانه‌های قهوه دنیا به
                خانه شما شکل گرفت. ما دانه‌ها را مستقیم از کشاورزان انتخاب،
                با دقت رست و بسته‌بندی می‌کنیم تا تازگی و طعم اصیل هر خاستگاه
                حفظ شود.
              </p>

              <Link
                to="/about"
                className="
                  inline-flex items-center gap-2
                  bg-amber-800 hover:bg-amber-700 text-white
                  font-bold px-6 py-3 rounded-2xl transition
                "
              >
                بیشتر بدانید
                <FaArrowLeft />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ================= Testimonials ================= */}
      {approvedReviews.length > 0 && (
        <Reveal>
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800">
                نظر مشتریان
              </h2>
              <p className="text-stone-500 font-light mt-2">
                تجربه واقعی کسانی که سرزمین قهوه را انتخاب کرده‌اند
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {approvedReviews.map((review) => (
                <div
                  key={review.id}
                  className="
                    bg-white rounded-3xl p-7 shadow-sm border border-amber-50
                    hover:shadow-xl hover:-translate-y-1
                    transition duration-300
                    flex flex-col
                  "
                >
                  <FaQuoteLeft className="text-amber-200 text-3xl mb-4" />

                  <p className="text-stone-600 font-light leading-8 flex-1">
                    {review.comment}
                  </p>

                  <div className="mt-6 pt-5 border-t border-amber-50">
                    <StarRating rating={review.rating} count={0} />

                    <p className="font-bold text-stone-800 mt-2">
                      {review.user}
                    </p>
                    <p className="text-sm text-stone-400">{review.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ================= Blog Preview ================= */}
      {latestPosts.length > 0 && (
        <Reveal>
          <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800">
                  از بلاگ ما بخوانید
                </h2>
                <p className="text-stone-500 font-light mt-2">
                  نکاتی برای علاقه‌مندان به دنیای قهوه
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <div
                    key={post.id}
                    className="
                      bg-[#F5EFE2] rounded-3xl p-7
                      border border-amber-50
                      hover:shadow-lg hover:-translate-y-1
                      transition duration-300
                    "
                  >
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                      {post.category}
                    </span>

                    <h3 className="font-bold text-lg text-stone-800 mt-4 mb-2">
                      {post.title}
                    </h3>

                    <p className="text-stone-500 font-light text-sm leading-7">
                      {post.excerpt}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/blog"
                  className="
                    inline-flex items-center gap-2
                    text-amber-800 font-bold
                    hover:text-amber-600 transition
                  "
                >
                  مشاهده همه مقالات
                  <FaArrowLeft />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* ================= Newsletter CTA ================= */}
      <Reveal>
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="
                relative overflow-hidden rounded-[36px]
                bg-amber-900 text-white
                px-8 py-14 text-center
              "
            >
              <img
                src={ctaImage}
                alt=""
                className="brand-photo absolute inset-0 w-full h-full object-cover opacity-10"
              />

              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                  از تخفیف‌ها و محصولات جدید باخبر شوید
                </h2>
                <p className="text-amber-100/80 font-light mb-8">
                  عضو خبرنامه سرزمین قهوه شوید و پیشنهادهای ویژه را از دست ندهید
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="
                    flex flex-col sm:flex-row gap-3
                    max-w-md mx-auto
                  "
                >
                  <input
                    type="email"
                    required
                    placeholder="ایمیل شما"
                    className="
                      flex-1 rounded-2xl px-5 py-3.5
                      text-stone-800 outline-none
                      focus:ring-2 focus:ring-amber-400
                    "
                  />
                  <button
                    type="submit"
                    className="
                      bg-amber-500 hover:bg-amber-400 text-amber-950
                      font-bold px-6 py-3.5 rounded-2xl transition
                    "
                  >
                    عضویت
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

export default HomePage;

import { Link } from "react-router-dom";
import { useMemo } from "react";

import {
  FaShippingFast,
  FaMedal,
  FaLeaf,
  FaQuoteRight,
} from "react-icons/fa";
import { GiCoffeeBeans } from "react-icons/gi";
import { HiArrowLeft } from "react-icons/hi2";

import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";

import ProductSlider from "../../components/shop/ProductSlider";
import StarRating from "../../components/shop/StarRating";

import reviews from "../../data/reviews";
import blogPosts from "../../data/blogPosts";

import heroImage from "../../assets/images/product/coffee.jpg";
import coffeeTimeQuote from "../../assets/images/product/coffee-time-quote.png";

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

  const publishedPosts = useMemo(
    () => blogPosts.filter((post) => post.status === "published").slice(0, 3),
    [],
  );

  const features = [
    {
      icon: <GiCoffeeBeans className="text-3xl" />,
      title: "دانه‌های تازه برشته",
      desc: "برشت‌کاری هفتگی و ارسال حداکثر تا ۴۸ ساعت پس از رست",
    },
    {
      icon: <FaShippingFast className="text-3xl" />,
      title: "ارسال سریع",
      desc: "ارسال به سراسر کشور با بسته‌بندی مخصوص حفظ عطر",
    },
    {
      icon: <FaMedal className="text-3xl" />,
      title: "کیفیت تضمینی",
      desc: "انتخاب و کاپینگ دانه‌ها توسط تیم متخصص کیفیت",
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "خاستگاه مشخص",
      desc: "ردیابی مبدأ هر محموله از مزرعه تا فنجان",
    },
  ];

  return (
    <div className="bg-[#FFFBEB]">
      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-900 to-amber-800 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-amber-700/60 text-amber-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-amber-500/40">
              ☕ تازه از مزرعه تا فنجان شما
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.4] mb-6">
              سرزمین قهوه؛ <br />
              جایی که هر جرعه یک تجربه‌ست
            </h1>

            <p className="text-amber-100/90 text-lg leading-8 mb-10 max-w-lg">
              تنوعی از بهترین دانه‌های تک‌خاستگاه و ترکیبی دنیا، برشته‌کاری
              شده به‌صورت هفتگی و آماده ارسال به در خانه شما.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-white text-amber-900 font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-amber-100 transition flex items-center gap-2"
              >
                مشاهده فروشگاه
                <HiArrowLeft />
              </Link>

              <Link
                to="/about"
                className="border border-amber-200/50 px-8 py-4 rounded-2xl hover:bg-white/10 transition"
              >
                داستان ما
              </Link>
            </div>

            <div className="flex gap-10 mt-14">
              <div>
                <p className="text-3xl font-extrabold">+۵۰</p>
                <p className="text-amber-200 text-sm mt-1">نوع قهوه</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">+۳۰۰۰</p>
                <p className="text-amber-200 text-sm mt-1">مشتری راضی</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">۴.۸</p>
                <p className="text-amber-200 text-sm mt-1">امتیاز مشتریان</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -inset-6 bg-amber-500/20 rounded-[40px] blur-3xl"></div>

            <img
              src={heroImage}
              alt="فنجان قهوه سرزمین قهوه"
              className="relative rounded-[40px] w-full max-w-md object-cover shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* ================= Categories ================= */}
      {activeCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-amber-900">
              دسته‌بندی محصولات
            </h2>
            <p className="text-stone-500 mt-3">
              هرچه که برای تجربه یک قهوه‌ی خوب نیاز دارید
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {activeCategories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.slug}`}
                className="group bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition border border-amber-50"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center text-2xl group-hover:bg-amber-800 group-hover:text-white transition">
                  <GiCoffeeBeans />
                </div>
                <p className="font-bold text-stone-800">{category.title}</p>
                <p className="text-xs text-stone-400 mt-1">
                  {category.count} محصول
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= Featured Products ================= */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <ProductSlider products={featuredProducts} title="محصولات ویژه" />

        <div className="text-center mt-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-amber-800 font-semibold hover:text-amber-900"
          >
            مشاهده همه محصولات
            <HiArrowLeft />
          </Link>
        </div>
      </section>

      {/* ================= Why Us ================= */}
      <section className="bg-amber-900 text-white py-16 mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">چرا سرزمین قهوه؟</h2>
            <p className="text-amber-200 mt-3">
              تعهد ما، کیفیت بدون سازش است
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-amber-800/50 rounded-3xl p-7 text-center border border-amber-700/50 hover:bg-amber-800 transition"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-700/60 flex items-center justify-center text-amber-100">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-amber-200/80 text-sm leading-6">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Testimonials ================= */}
      {approvedReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">
              نظر مشتریان ما
            </h2>
            <p className="text-stone-500 mt-3">
              تجربه‌ی واقعی کسانی که سرزمین قهوه را چشیده‌اند
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {approvedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-7 shadow-sm border border-amber-50 relative"
              >
                <FaQuoteRight className="text-amber-100 text-4xl absolute top-6 left-6" />

                <StarRating rating={review.rating} count={0} />

                <p className="text-stone-600 leading-8 mt-4 mb-6">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">
                    {review.user}
                  </span>
                  <span className="text-xs text-stone-400">
                    {review.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= Blog Preview ================= */}
      {publishedPosts.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-900">
                از بلاگ سرزمین قهوه
              </h2>
              <p className="text-stone-500 mt-3">
                نکته‌ها و دانستنی‌های دنیای قهوه
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {publishedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-amber-50/60 rounded-3xl p-7 border border-amber-100 hover:shadow-lg transition"
                >
                  <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>

                  <h3 className="font-bold text-lg text-stone-800 mt-4 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-stone-500 text-sm leading-7">
                    {post.excerpt}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-amber-800 font-semibold hover:text-amber-900"
              >
                مشاهده همه مطالب
                <HiArrowLeft />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= Newsletter ================= */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-l from-amber-800 to-amber-950 rounded-[40px] p-10 md:p-14 text-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <img
            src={coffeeTimeQuote}
            alt=""
            className="w-28 h-28 rounded-2xl object-cover hidden sm:block shadow-lg"
          />

          <div className="flex-1 text-center md:text-right">
            <h3 className="text-2xl font-bold mb-3">
              از تخفیف‌ها و محصولات جدید باخبر شو
            </h3>
            <p className="text-amber-200/90 mb-6">
              با عضویت در خبرنامه، اولین نفری باش که از پک‌های جدید و تخفیف‌ها
              مطلع می‌شی.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0"
            >
              <input
                type="email"
                required
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 rounded-2xl px-5 py-3 text-stone-800 outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="bg-white text-amber-900 font-bold px-6 py-3 rounded-2xl hover:bg-amber-100 transition"
              >
                عضویت
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

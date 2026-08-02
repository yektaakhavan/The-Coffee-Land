import { Link } from "react-router-dom";
import { GiCoffeeBeans, GiFarmTractor, GiWorld } from "react-icons/gi";
import { FaHeart, FaLightbulb, FaHandshake } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi2";

import coffeeShopImage from "../../assets/images/product/coffee-shops-coffee.png";
import coffeeTimeImage from "../../assets/images/product/coffee-time.png";

function AboutPage() {
  const values = [
    {
      icon: <GiCoffeeBeans className="text-2xl" />,
      title: "کیفیت بدون سازش",
      desc: "هر محموله پیش از عرضه، توسط تیم کاپینگ ما تست و تایید می‌شود.",
    },
    {
      icon: <GiWorld className="text-2xl" />,
      title: "شفافیت در خاستگاه",
      desc: "مبدأ و مسیر هر دانه را از مزرعه تا فنجان شما دنبال می‌کنیم.",
    },
    {
      icon: <FaHandshake className="text-2xl" />,
      title: "همکاری منصفانه",
      desc: "خرید مستقیم از کشاورزان با قیمتی عادلانه و پایدار.",
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "یادگیری مستمر",
      desc: "بروزترین روش‌های برشته‌کاری و دم‌آوری را دنبال می‌کنیم.",
    },
  ];

  const timeline = [
    {
      year: "۱۴۰۰",
      title: "شروع یک رؤیا",
      desc: "سرزمین قهوه با یک کافه‌ی کوچک و عشق به قهوه‌ی تخصصی متولد شد.",
    },
    {
      year: "۱۴۰۲",
      title: "راه‌اندازی فروشگاه آنلاین",
      desc: "برای رسیدن به عاشقان قهوه در سراسر کشور، فروشگاه آنلاین را افتتاح کردیم.",
    },
    {
      year: "۱۴۰۴",
      title: "همکاری مستقیم با مزارع",
      desc: "ارتباط مستقیم با کشاورزان اتیوپی، کلمبیا و برزیل برای تامین دانه‌های باکیفیت‌تر.",
    },
    {
      year: "۱۴۰۵",
      title: "بیش از ۳۰۰۰ مشتری راضی",
      desc: "امروز با افتخار میزبان جامعه‌ای رو به رشد از عاشقان قهوه هستیم.",
    },
  ];

  return (
    <div className="bg-[#FFFBEB]">
      {/* Hero */}
      <section className="bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-amber-700/60 text-amber-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-amber-500/40">
              درباره سرزمین قهوه
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold leading-[1.5] mb-6">
              داستان ما، از یک علاقه ساده شروع شد
            </h1>

            <p className="text-amber-100/90 leading-8 max-w-lg">
              سرزمین قهوه با هدف رساندن دانه‌های باکیفیت و تازه‌برشته‌شده به
              دست هر عاشق قهوه‌ای در ایران شکل گرفت؛ با احترام به کشاورز، به
              محیط‌زیست و به تجربه‌ی فنجانی که در دست شماست.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={coffeeShopImage}
              alt="فضای سرزمین قهوه"
              className="rounded-[32px] max-w-sm w-full shadow-2xl border border-white/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-5">
            مأموریت ما
          </h2>

          <p className="text-stone-600 leading-8 mb-6">
            ما معتقدیم قهوه‌ی خوب فقط طعم خوب نیست؛ داستانی از مزرعه تا فنجان
            است. هدف ما این است که این داستان را با شفافیت کامل به شما ارائه
            کنیم؛ از انتخاب دانه، تا فرآوری و بسته‌بندی که تازگی و عطر
            محصول را تا لحظه‌ی باز شدن درِ بسته حفظ می‌کند.
          </p>

          <div className="flex items-center gap-3 text-amber-800 font-semibold">
            <FaHeart />
            <span>ساخته‌شده با عشق برای عاشقان قهوه</span>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-8 bg-amber-800 hover:bg-amber-700 text-white font-bold px-7 py-3.5 rounded-2xl transition"
          >
            مشاهده محصولات
            <HiArrowLeft />
          </Link>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <img
            src={coffeeTimeImage}
            alt="لحظه‌ی قهوه"
            className="rounded-[32px] max-w-sm w-full shadow-xl object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">ارزش‌های ما</h2>
            <p className="text-stone-500 mt-3">
              اصولی که هر تصمیم ما بر پایه‌ی آن‌ها گرفته می‌شود
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-amber-50/60 rounded-3xl p-7 text-center border border-amber-100 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-800 text-white flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="font-bold text-stone-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-stone-500 text-sm leading-7">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-amber-900">مسیر ما</h2>
          <p className="text-stone-500 mt-3">از یک ایده تا یک جامعه</p>
        </div>

        <div className="relative border-r-2 border-amber-200 pr-8 space-y-12">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -right-[41px] top-1 w-4 h-4 rounded-full bg-amber-800 border-4 border-amber-100"></span>

              <span className="text-amber-700 font-bold text-sm">
                {item.year}
              </span>
              <h3 className="font-bold text-lg text-stone-800 mt-1 mb-2">
                {item.title}
              </h3>
              <p className="text-stone-500 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-l from-amber-800 to-amber-950 rounded-[40px] p-10 md:p-14 text-white text-center">
          <GiFarmTractor className="text-4xl mx-auto mb-4 text-amber-200" />

          <h3 className="text-2xl font-bold mb-3">
            بخشی از داستان ما شوید
          </h3>
          <p className="text-amber-200/90 mb-8 max-w-xl mx-auto">
            هر خرید از سرزمین قهوه، حمایتی است از کشاورزان و صنعتگرانی که
            این فنجان را ممکن می‌سازند.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-amber-900 font-bold px-8 py-4 rounded-2xl hover:bg-amber-100 transition"
          >
            با ما در ارتباط باشید
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

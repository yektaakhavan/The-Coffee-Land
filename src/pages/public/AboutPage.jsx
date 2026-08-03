import { Link } from "react-router-dom";
import {
  FaAward,
  FaHandHoldingHeart,
  FaLeaf,
  FaMapMarkerAlt,
  FaSeedling,
  FaUsers,
} from "react-icons/fa";

import Reveal from "../../components/ui/Reveal";

import aboutHero from "../../assets/images/product/coffee.jpg";
import teamImage from "../../assets/images/product/coffee-time.png";

const stats = [
  { label: "مشتری راضی", value: "+۵٬۰۰۰" },
  { label: "نوع قهوه", value: "+۲۰" },
  { label: "کشور مبدا", value: "۸" },
  { label: "سال تجربه", value: "۶" },
];

const values = [
  {
    icon: FaSeedling,
    title: "تازگی تضمینی",
    desc: "هر بچ قهوه پس از سفارش رست می‌شود تا طعم و عطر آن دست‌نخورده به دست شما برسد.",
  },
  {
    icon: FaLeaf,
    title: "خرید مستقیم و منصفانه",
    desc: "دانه‌ها مستقیم از کشاورزان و تعاونی‌های کوچک خریداری می‌شوند، بدون واسطه‌های غیرضروری.",
  },
  {
    icon: FaAward,
    title: "کیفیت قابل اعتماد",
    desc: "هر محموله پیش از عرضه از نظر رنگ رست، رطوبت و طعم کنترل کیفیت می‌شود.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "خدمت با علاقه",
    desc: "سرزمین قهوه یک پروژه شخصی است که با عشق به دنیای قهوه ساخته و نگه‌داری می‌شود.",
  },
];

function AboutPage() {
  return (
    <div className="bg-[#F5EFE2]">
      {/* ================= Hero ================= */}
      <section className="relative bg-amber-900 text-white overflow-hidden">
        <img
          src={aboutHero}
          alt=""
          className="brand-photo absolute inset-0 w-full h-full object-cover opacity-20"
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-amber-800/60 border border-amber-600/50 text-amber-200 text-sm font-medium">
            درباره سرزمین قهوه
          </span>

          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-6">
            قصه‌ای که از یک فنجان قهوه شروع شد
          </h1>

          <p className="text-amber-100/80 font-light leading-8 max-w-2xl mx-auto">
            سرزمین قهوه با یک هدف ساده شکل گرفت: رساندن دانه‌های تازه و
            باکیفیت قهوه از مزارع دنیا به فنجان شما، بدون هیچ مصالحه‌ای در
            کیفیت.
          </p>
        </div>
      </section>

      {/* ================= Story ================= */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
          <div className="text-center md:text-right">
            <span className="text-amber-700 font-bold">داستان ما</span>

            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800 mt-3 mb-5">
              از یک علاقه شخصی تا یک فروشگاه آنلاین
            </h2>

            <p className="text-stone-600 font-light leading-8 mb-5">
              همه‌چیز از علاقه به آزمایش روش‌های مختلف دم‌آوری قهوه شروع شد.
              کم‌کم این علاقه به جست‌وجوی دانه‌های باکیفیت‌تر و آشنایی با
              خاستگاه‌های مختلف قهوه در دنیا رسید.
            </p>

            <p className="text-stone-600 font-light leading-8">
              امروز سرزمین قهوه تلاش می‌کند همین تجربه را برای علاقه‌مندان
              دیگر هم فراهم کند؛ انتخاب دقیق دانه، رست حرفه‌ای و بسته‌بندی
              مناسب، تا کیفیت از مزرعه تا فنجان شما حفظ شود.
            </p>
          </div>

          <img
            src={teamImage}
            alt="سرزمین قهوه"
            className="brand-photo rounded-3xl w-full h-[320px] object-cover shadow-lg"
          />
        </section>
      </Reveal>

      {/* ================= Stats ================= */}
      <Reveal>
        <section className="bg-amber-900 text-white py-14">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-black text-amber-300">
                  {stat.value}
                </p>
                <p className="text-amber-100/70 font-light mt-2 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ================= Values ================= */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800">
              چرا سرزمین قهوه؟
            </h2>
            <p className="text-stone-500 font-light mt-2">
              اصولی که در هر مرحله از کار به آن‌ها پایبندیم
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="
                  bg-white rounded-3xl p-7 text-center
                  border border-amber-50 shadow-sm
                  hover:shadow-lg hover:-translate-y-1
                  transition duration-300
                "
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-800 text-2xl flex items-center justify-center mb-5">
                  <Icon />
                </div>
                <h3 className="font-bold text-stone-800 mb-2">{title}</h3>
                <p className="text-sm text-stone-500 leading-7">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ================= Contact strip ================= */}
      <Reveal>
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <FaUsers className="text-3xl text-amber-800 mx-auto mb-4" />

            <h2 className="text-2xl font-extrabold text-stone-800 mb-3">
              سوالی دارید؟ خوشحال می‌شویم کمک کنیم
            </h2>

            <p className="text-stone-500 mb-8 flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-amber-700" />
              تهران، ایران
            </p>

            <Link
              to="/contact"
              className="
                inline-flex items-center gap-2
                bg-amber-800 hover:bg-amber-700 text-white
                font-bold px-7 py-3.5 rounded-2xl transition
              "
            >
              تماس با ما
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

export default AboutPage;

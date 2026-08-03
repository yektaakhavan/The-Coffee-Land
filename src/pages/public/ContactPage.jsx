import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from "react-icons/hi2";
import {
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

import { contactSchema } from "../../validation/contactSchema";
import Reveal from "../../components/ui/Reveal";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    // شبیه‌سازی ارسال به سرور
    await new Promise((resolve) => setTimeout(resolve, 700));

    console.log("Contact form submitted:", data);

    setSubmitted(true);
    reset();
  };

  const contactInfo = [
    {
      icon: <HiOutlineMapPin className="text-xl" />,
      title: "آدرس",
      value: "تهران، خیابان ولیعصر، پلاک ۱۲",
    },
    {
      icon: <HiOutlinePhone className="text-xl" />,
      title: "تماس تلفنی",
      value: "021-88776655",
    },
    {
      icon: <HiOutlineEnvelope className="text-xl" />,
      title: "ایمیل",
      value: "hello@coffeeland.ir",
    },
    {
      icon: <HiOutlineClock className="text-xl" />,
      title: "ساعات کاری",
      value: "شنبه تا پنجشنبه، ۹ تا ۲۱",
    },
  ];

  return (
    <div className="bg-[#F5EFE2]">
      {/* Hero */}
      <section className="bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <span className="inline-block bg-amber-700/60 text-amber-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-amber-500/40">
            در ارتباط باشید
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            سوالی دارید؟ خوشحال می‌شویم کمک کنیم
          </h1>

          <p className="text-amber-100/90 max-w-xl mx-auto leading-8">
            برای سفارش‌های عمده، همکاری یا هر پرسشی درباره محصولات، فرم زیر
            را پر کنید یا مستقیم با ما تماس بگیرید.
          </p>
        </div>
      </section>

      <Reveal>
      <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-10">
        {/* Info */}
        <div className="lg:col-span-2 space-y-5">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-5 flex items-start gap-4 border border-amber-50 shadow-sm"
            >
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-amber-800 text-white flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-stone-800">{item.title}</p>
                <p className="text-stone-500 text-sm mt-1">{item.value}</p>
              </div>
            </div>
          ))}

          <div className="bg-amber-900 rounded-3xl p-6 text-white">
            <p className="font-bold mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-amber-700/60 hover:bg-amber-700 transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://t.me"
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-amber-700/60 hover:bg-amber-700 transition"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="text-xl" />
              </a>
              <a
                href="https://wa.me"
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-amber-700/60 hover:bg-amber-700 transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 bg-white rounded-[32px] p-7 md:p-9 shadow-sm border border-amber-50">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            ارسال پیام
          </h2>

          {submitted && (
            <div className="mb-6 bg-green-50 text-green-700 border border-green-200 rounded-2xl p-4 text-sm">
              پیام شما با موفقیت ارسال شد. به‌زودی با شما تماس می‌گیریم. 🌿
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid sm:grid-cols-2 gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-stone-700">
                نام و نام خانوادگی
              </label>
              <input
                {...register("fullName")}
                placeholder="مثلا: علی رضایی"
                className="border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-stone-700">
                ایمیل
              </label>
              <input
                {...register("email")}
                placeholder="example@email.com"
                className="border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                dir="ltr"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-stone-700">
                شماره موبایل (اختیاری)
              </label>
              <input
                {...register("phone")}
                placeholder="09xxxxxxxxx"
                className="border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                dir="ltr"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-stone-700">
                موضوع
              </label>
              <input
                {...register("subject")}
                placeholder="مثلا: سفارش عمده"
                className="border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.subject && (
                <span className="text-red-500 text-xs">
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-stone-700">
                پیام شما
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="پیام خود را بنویسید..."
                className="border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
              {errors.message && (
                <span className="text-red-500 text-xs">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-800 hover:bg-amber-700 disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition"
              >
                {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
              </button>
            </div>
          </form>
        </div>
      </section>
      </Reveal>

      {/* Map placeholder */}
      <Reveal>
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-[32px] overflow-hidden border border-amber-100 h-72 bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center text-amber-800/60 font-semibold">
          نقشه موقعیت فروشگاه
        </div>
      </section>
      </Reveal>
    </div>
  );
}

export default ContactPage;

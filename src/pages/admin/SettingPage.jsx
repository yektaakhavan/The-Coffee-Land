import { useState } from "react";

import FormSection from "../../components/admin/ui/FormSection";

function SettingPage() {
  const [settings, setSettings] = useState({
    storeName: "The Coffee Land",

    phone: "09123456789",

    email: "info@coffeeland.com",

    address: "اصفهان، خیابان چهارباغ",

    instagram: "@thecoffeeland",

    telegram: "@thecoffeeland",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setSettings({
      ...settings,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <section className="space-y-8">
      <h1
        className="
        text-3xl
        font-bold
      "
      >
        تنظیمات فروشگاه
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          space-y-8
        "
      >
        <FormSection title="اطلاعات فروشگاه">
          <div
            className="
            grid
            md:grid-cols-2
            gap-6
          "
          >
            <div>
              <label className="block mb-2 font-semibold">نام فروشگاه</label>

              <input
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">شماره تماس</label>

              <input
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">ایمیل</label>

              <input
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">اینستاگرام</label>

              <input
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                "
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold">آدرس</label>

            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows="4"
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>
        </FormSection>

        <FormSection title="شبکه‌های اجتماعی">
          <div>
            <label className="block mb-2 font-semibold">تلگرام</label>

            <input
              name="telegram"
              value={settings.telegram}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>
        </FormSection>

        <div className="flex justify-end items-center gap-5">
          {saved && (
            <span
              className="
              text-green-600
              font-semibold
            "
            >
              تغییرات ذخیره شد ✓
            </span>
          )}

          <button
            type="submit"
            className="
              bg-amber-700
              hover:bg-amber-800
              text-white
              px-8
              py-3
              rounded-xl
              font-bold
            "
          >
            ذخیره تنظیمات
          </button>
        </div>
      </form>
    </section>
  );
}

export default SettingPage;

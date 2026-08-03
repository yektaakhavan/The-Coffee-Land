import { useEffect, useState } from "react";

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

function CategoryForm({
  initialValues = null,
  onSubmit,
  onCancel,
  submitLabel = "ذخیره",
}) {
  const [values, setValues] = useState({
    title: "",
    slug: "",
    status: "active",
  });

  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title ?? "",
        slug: initialValues.slug ?? "",
        status: initialValues.status ?? "active",
      });
      setSlugTouched(true);
    }
  }, [initialValues]);

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setValues((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugify(title),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "slug") setSlugTouched(true);

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.title.trim() || !values.slug.trim()) return;

    onSubmit({
      title: values.title.trim(),
      slug: slugify(values.slug),
      status: values.status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-2 font-semibold text-stone-700">
          نام دسته‌بندی
        </label>

        <input
          name="title"
          value={values.title}
          onChange={handleTitleChange}
          placeholder="مثلاً تک خاستگاه"
          required
          className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-stone-700">
          Slug
        </label>

        <input
          name="slug"
          value={values.slug}
          onChange={handleChange}
          placeholder="single-origin"
          dir="ltr"
          required
          className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 text-left"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-stone-700">
          وضعیت
        </label>

        <select
          name="status"
          value={values.status}
          onChange={handleChange}
          className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="active">فعال</option>
          <option value="draft">پیش‌نویس</option>
          <option value="inactive">غیرفعال</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-6 py-3 hover:bg-gray-100 transition"
        >
          انصراف
        </button>

        <button
          type="submit"
          className="rounded-xl bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 font-semibold transition"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;

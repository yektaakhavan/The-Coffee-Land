import { useFormContext } from "react-hook-form";

function ProductBasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-xl font-bold text-stone-800">اطلاعات پایه محصول</h2>

        <p className="text-sm text-gray-500 mt-1">
          اطلاعات اصلی محصول را وارد کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-semibold">نام محصول</label>

          <input
            {...register("name", {
              required: "نام محصول الزامی است",
            })}
            className="
              w-full
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-amber-500
            "
            placeholder="مثلاً قهوه عربیکا اتیوپی"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className="block mb-2 font-semibold">کد محصول (SKU)</label>

          <input
            {...register("sku", {
              required: "کد محصول الزامی است",
            })}
            className="
              w-full
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-amber-500
            "
            placeholder="CF-0007"
          />

          {errors.sku && (
            <p className="text-red-500 text-sm mt-2">{errors.sku.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">دسته بندی</label>

          <select
            {...register("category", {
              required: "دسته بندی را انتخاب کنید",
            })}
            className="
              w-full
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-amber-500
            "
          >
            <option value="">انتخاب کنید</option>

            <option value="single-origin">تک خاستگاه</option>

            <option value="espresso-blend">بلند اسپرسو</option>

            <option value="turkish">قهوه ترک</option>
          </select>

          {errors.category && (
            <p className="text-red-500 text-sm mt-2">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-semibold">وضعیت محصول</label>

          <select
            {...register("status")}
            className="
              w-full
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-amber-500
            "
          >
            <option value="active">فعال</option>

            <option value="draft">پیش نویس</option>

            <option value="out-of-stock">ناموجود</option>
          </select>
        </div>
      </div>

      {/* Description */}

      <div>
        <label className="block mb-2 font-semibold">توضیحات محصول</label>

        <textarea
          rows={6}
          {...register("description")}
          className="
            w-full
            border
            rounded-xl
            p-3
            outline-none
            resize-none
            focus:ring-2
            focus:ring-amber-500
          "
          placeholder="توضیحی درباره محصول..."
        />
      </div>
    </section>
  );
}

export default ProductBasicInfo;

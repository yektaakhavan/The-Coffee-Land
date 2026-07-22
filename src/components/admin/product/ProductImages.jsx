import { useFormContext } from "react-hook-form";

import FormSection from "../ui/FormSection";

function ProductImages() {
  const { register, watch } = useFormContext();

  const image = watch("image");

  return (
    <FormSection title="تصویر محصول">
      <p className="text-sm text-gray-500 mb-6">
        آدرس تصویر اصلی محصول را وارد کنید.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="/src/assets/images/product/01.jpg"
          {...register("image")}
          className="
            w-full
            rounded-xl
            border
            border-stone-300
            px-4
            py-3
            outline-none
            transition
            focus:border-amber-600
            focus:ring-2
            focus:ring-amber-200
          "
        />

        {image && (
          <div className="overflow-hidden rounded-2xl border bg-stone-50 p-4">
            <img
              src={image}
              alt="Preview"
              className="h-56 w-full object-cover rounded-xl"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    </FormSection>
  );
}

export default ProductImages;

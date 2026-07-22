import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import FormTextarea from "../forms/FormTextarea";

import FormSection from "../ui/FormSection";
import FormGrid from "../ui/FormGrid";

import productCategories from "../../../constants/productCategories";

function ProductBasicInfo() {
  return (
    <FormSection title="اطلاعات اصلی محصول">
      <p className="text-sm text-gray-500 mb-6">
        اطلاعات پایه محصول را وارد کنید.
      </p>

      <FormGrid cols={2}>
        <FormInput
          name="name"
          label="نام محصول"
          placeholder="مثلاً قهوه عربیکا اتیوپی"
          rules={{
            required: "نام محصول الزامی است",
          }}
        />

        <FormInput
          name="sku"
          label="کد محصول (SKU)"
          placeholder="CF-0007"
          rules={{
            required: "کد محصول الزامی است",
          }}
        />

        <FormSelect
          name="category"
          label="دسته بندی"
          options={productCategories}
          rules={{
            required: "انتخاب دسته بندی الزامی است",
          }}
        />

        <FormSelect
          name="status"
          label="وضعیت محصول"
          options={[
            {
              value: "active",
              label: "فعال",
            },
            {
              value: "draft",
              label: "پیش نویس",
            },
            {
              value: "out-of-stock",
              label: "ناموجود",
            },
          ]}
        />
      </FormGrid>

      <div className="mt-6">
        <FormTextarea
          name="description"
          label="توضیحات محصول"
          rows={6}
          placeholder="توضیحی درباره محصول..."
        />
      </div>
    </FormSection>
  );
}

export default ProductBasicInfo;

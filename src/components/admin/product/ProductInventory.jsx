import FormInput from "../forms/FormInput";
import FormGrid from "../ui/FormGrid";
import FormSection from "../ui/FormSection";

function ProductInventory() {
  return (
    <FormSection title="مدیریت موجودی">
      <p className="text-sm text-gray-500 mb-6">
        اطلاعات موجودی و فروش محصول را وارد کنید.
      </p>

      <FormGrid cols={3}>
        <FormInput
          name="stock"
          label="موجودی"
          type="number"
          placeholder="مثلاً 50"
          rules={{
            required: "موجودی الزامی است",
            min: {
              value: 0,
              message: "موجودی نمی‌تواند منفی باشد",
            },
          }}
        />

        <FormInput
          name="reserved"
          label="رزرو شده"
          type="number"
          placeholder="0"
          rules={{
            min: {
              value: 0,
              message: "عدد معتبر وارد کنید",
            },
          }}
        />

        <FormInput
          name="sold"
          label="فروش رفته"
          type="number"
          placeholder="0"
          rules={{
            min: {
              value: 0,
              message: "عدد معتبر وارد کنید",
            },
          }}
        />
      </FormGrid>
    </FormSection>
  );
}

export default ProductInventory;

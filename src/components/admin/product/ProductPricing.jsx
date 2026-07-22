import FormInput from "../forms/FormInput";
import FormSection from "../ui/FormSection";
import FormGrid from "../ui/FormGrid";

function ProductPricing() {
  return (
    <FormSection title="قیمت گذاری">
      <FormGrid cols={2}>
        <FormInput
          name="basePrice"
          label="قیمت پایه (تومان)"
          type="number"
          placeholder="180000"
          rules={{
            required: "قیمت محصول الزامی است",
            min: {
              value: 1000,
              message: "قیمت معتبر وارد کنید",
            },
          }}
        />

        <FormInput
          name="discountPercent"
          label="درصد تخفیف"
          type="number"
          placeholder="10"
          rules={{
            min: {
              value: 0,
              message: "حداقل ۰",
            },
            max: {
              value: 100,
              message: "حداکثر ۱۰۰",
            },
          }}
        />
      </FormGrid>
    </FormSection>
  );
}

export default ProductPricing;

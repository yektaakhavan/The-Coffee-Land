import FormInput from "../forms/FormInput";
import FormSection from "../ui/FormSection";
import FormGrid from "../ui/FormGrid";

function ProductCoffeeInfo() {
  return (
    <FormSection title="مشخصات تخصصی قهوه">
      <p className="text-sm text-gray-500 mb-6">
        اطلاعات تخصصی مربوط به دانه قهوه را وارد کنید.
      </p>

      <FormGrid cols={3}>
        <FormInput name="origin" label="کشور مبدا" placeholder="اتیوپی" />

        <FormInput name="roastLevel" label="درجه رست" placeholder="Medium" />

        <FormInput name="process" label="نوع فرآوری" placeholder="Washed" />

        <FormInput name="acidity" label="اسیدیته" placeholder="بالا" />

        <FormInput name="bitterness" label="تلخی" placeholder="متوسط" />

        <FormInput name="body" label="بادی" placeholder="سنگین" />
        <FormInput
          name="flavorNotes"
          label="نت‌های طعمی"
          placeholder="بلوبری، شکلات، یاس"
        />

        <FormInput
          name="sizes"
          label="وزن‌های قابل فروش"
          placeholder="250g,500g,1kg"
        />
      </FormGrid>
    </FormSection>
  );
}

export default ProductCoffeeInfo;

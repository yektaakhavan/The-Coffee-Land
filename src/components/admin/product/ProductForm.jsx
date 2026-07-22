import { FormProvider, useForm } from "react-hook-form";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricing from "./ProductPricing";
import ProductInventory from "./ProductInventory";
import ProductCoffeeInfo from "./ProductCoffeeInfo";
import ProductImages from "./ProductImages";

function ProductForm({
  defaultValues = {},
  onSubmit,
  submitText = "ذخیره محصول",
}) {
  const methods = useForm({
    defaultValues: {
      name: "",
      sku: "",

      category: "",

      description: "",

      basePrice: "",

      discountPercent: "",

      stock: "",

      reserved: "",

      sold: "",

      origin: "",

      roastLevel: "",

      process: "",

      acidity: "",

      bitterness: "",

      body: "",

      images: [],

      ...defaultValues,
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          space-y-8
        "
      >
        <ProductBasicInfo />

        <ProductPricing />

        <ProductInventory />

        <ProductCoffeeInfo />

        <ProductImages />

        <div className="flex justify-end">
          <button
            type="submit"
            className="
              px-8
              py-3
              rounded-xl
              bg-amber-700
              hover:bg-amber-800
              text-white
              font-semibold
              transition
            "
          >
            {submitText}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ProductForm;

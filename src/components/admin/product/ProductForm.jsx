import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../../../context/ProductContext";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricing from "./ProductPricing";
import ProductInventory from "./ProductInventory";
import ProductCoffeeInfo from "./ProductCoffeeInfo";
import ProductImages from "./ProductImages";

function ProductForm({ mode = "create", defaultValues = {} }) {
  const navigate = useNavigate();

  const { addProduct, updateProduct } = useProducts();

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

      status: "active",

      image: "",

      ...defaultValues,
    },
  });

  useEffect(() => {
    methods.reset({
      ...defaultValues,
    });
  }, [defaultValues, methods]);

  function handleFormSubmit(data) {
    const product = {
      id: mode === "edit" ? defaultValues.id : Date.now(),

      sku: data.sku,

      name: data.name,

      slug: data.name.trim().toLowerCase().replace(/\s+/g, "-"),

      category: {
        id: defaultValues.category?.id || 1,
        title: data.category,
        slug: data.category,
      },

      images: data.image
        ? [data.image]
        : defaultValues.images || ["/images/default-product.jpg"],

      roastLevel: data.roastLevel,
      origin: data.origin,
      process: data.process,

      basePrice: Number(data.basePrice),

      discountPercent: Number(data.discountPercent || 0),

      inventory: {
        stock: Number(data.stock || 0),
        reserved: Number(data.reserved || 0),
        sold: Number(data.sold || 0),
      },

      status: data.status,

      rating: defaultValues.rating || 0,

      reviewCount: defaultValues.reviewCount || 0,

      flavorNotes: defaultValues.flavorNotes || [],

      acidity: data.acidity,
      bitterness: data.bitterness,
      body: data.body,

      description: data.description,

      sizes: defaultValues.sizes || ["250g"],

      isFeatured: defaultValues.isFeatured || false,

      createdAt:
        mode === "edit" ? defaultValues.createdAt : new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    };

    if (mode === "create") {
      addProduct(product);
    } else {
      updateProduct(product.id, product);
    }

    navigate("/admin/products");
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
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
            {mode === "create" ? "افزودن محصول" : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ProductForm;

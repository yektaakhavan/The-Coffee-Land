import { useParams } from "react-router-dom";

import ProductForm from "../../components/admin/product/ProductForm";

import { useProducts } from "../../context/ProductContext";

function ProductEditPage() {
  const { id } = useParams();

  const { getProductById } = useProducts();

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold">محصول پیدا نشد.</h2>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <ProductForm
        mode="edit"
        defaultValues={{
          ...product,

          // FormSelect matches on slug, not the display title
          category: product.category.slug,

          stock: product.inventory.stock,

          reserved: product.inventory.reserved,

          sold: product.inventory.sold,
        }}
      />
    </section>
  );
}

export default ProductEditPage;

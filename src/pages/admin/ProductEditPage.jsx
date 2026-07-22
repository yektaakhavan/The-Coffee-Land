import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/admin/product/ProductForm";

import { useProducts } from "../../context/ProductContext";

function ProductEditPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { getProductById, updateProduct } = useProducts();

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold">محصول پیدا نشد.</h2>
      </div>
    );
  }

  const handleSubmit = (data) => {
    updateProduct(product.id, {
      ...product,

      ...data,

      category: {
        ...product.category,
        title: data.category,
      },

      basePrice: Number(data.basePrice),

      discountPercent: Number(data.discountPercent),

      inventory: {
        stock: Number(data.stock),
        reserved: Number(data.reserved),
        sold: Number(data.sold),
      },

      updatedAt: new Date().toISOString(),
    });

    navigate("/admin/products");
  };

  return (
    <section className="space-y-8">
      <ProductForm
        defaultValues={{
          ...product,

          category: product.category.title,

          stock: product.inventory.stock,

          reserved: product.inventory.reserved,

          sold: product.inventory.sold,
        }}
        submitText="ذخیره تغییرات"
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default ProductEditPage;

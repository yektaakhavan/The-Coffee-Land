import ProductForm from "../../components/admin/product/ProductForm";

function AddProductPage() {
  return (
    <section className="space-y-8">
      <ProductForm mode="create" />
    </section>
  );
}

export default AddProductPage;

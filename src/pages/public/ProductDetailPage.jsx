import { useParams } from "react-router-dom";
import products from "../../data/products";

import ProductGallery from "../../components/shop/ProductGallery";
import ProductInfo from "../../components/shop/ProductInfo";
import ProductFeatures from "../../components/shop/ProductFeatures";
import AddToCart from "../../components/shop/AddToCart";

function ProductDetailPage() {
  const { slug } = useParams();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <div className="text-center py-20">محصول پیدا نشد</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <div className="grid lg:grid-cols-2 gap-12">
        <ProductGallery product={product} />

        <div>
          <ProductInfo product={product} />

          <ProductFeatures product={product} />

          <AddToCart product={product} />
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;

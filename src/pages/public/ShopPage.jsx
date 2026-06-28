// import React from "react";
// import ProductCard from "../../components/shop/ProductCard";

// function ShopPage() {
//   return (
//     <>
//       <ProductCard />
//     </>
//   );
// }

// export default ShopPage;

import React from "react";
import products from "../../data/products";
import ProductCard from "../../components/shop/ProductCard";

function ShopPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">
          🛒 فروشگاه قهوه
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;

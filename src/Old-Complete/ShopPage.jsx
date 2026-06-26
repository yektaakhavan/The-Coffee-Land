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

// import React from "react";
// import ProductSlider from "../../components/shop/ProductSlider";
// import products from "../../data/products";

// // جداسازی محصولات بر اساس دسته‌بندی
// const allProducts = products;
// const bestSellers = products.filter((p) => p.isFeatured);
// const amazingOffers = products.filter((p) => p.discountPercent > 0);

// function ShopPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* همه محصولات */}
//       <ProductSlider products={allProducts} title="همه محصولات" />

//       {/* پرفروش‌ترین‌ها */}
//       <ProductSlider products={bestSellers} title="پرفروش‌ترین‌های هفته" />

//       {/* پیشنهاد شگفت‌انگیز */}
//       <ProductSlider products={amazingOffers} title="پیشنهاد شگفت‌انگیز" />
//     </div>
//   );
// }

// export default ShopPage;

import React, { useState } from "react";
import ProductCard from "../../components/shop/ProductCard";
import products from "../../data/products";

function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // فیلتر کردن محصولات بر اساس جستجو
  const filteredProducts = products.filter(
    (product) =>
      product.name.includes(searchTerm) ||
      product.origin.includes(searchTerm) ||
      product.flavorNotes.some((note) => note.includes(searchTerm)),
  );

  // مرتب‌سازی محصولات
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.basePrice - b.basePrice;
      case "price-high":
        return b.basePrice - a.basePrice;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return b.discountPercent - a.discountPercent;
      default:
        return a.id - b.id;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* عنوان صفحه */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">محصولات ما</h1>
        <p className="text-gray-500 mt-2">
          بهترین قهوه‌های تک‌خاستگاه و ترکیبی
        </p>
      </div>

      {/* نوار جستجو و فیلتر */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* جستجو */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="جستجوی قهوه..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
          />
          <svg
            className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* مرتب‌سازی */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            مرتب‌سازی:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all bg-white"
          >
            <option value="default">پیش‌فرض</option>
            <option value="price-low">قیمت: کم به زیاد</option>
            <option value="price-high">قیمت: زیاد به کم</option>
            <option value="rating">امتیاز</option>
            <option value="discount">تخفیف</option>
          </select>
        </div>

        {/* تعداد محصولات */}
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {sortedProducts.length} محصول
        </span>
      </div>

      {/* نمایش محصولات */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">محصولی با این مشخصات یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopPage;

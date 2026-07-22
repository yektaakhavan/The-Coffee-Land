import { useMemo, useState } from "react";

import ProductCard from "../../components/shop/ProductCard";

import { useProducts } from "../../context/ProductContext";

function ShopPage() {
  const { products } = useProducts();

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const result = products.map((product) => product.category);

    return result.filter(
      (item, index, self) =>
        index === self.findIndex((x) => x.slug === item.slug),
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || product.category.slug === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  return (
    <div
      className="
      min-h-screen
      p-6
      bg-gradient-to-br
      from-stone-100
      via-amber-50
      to-orange-100
    "
    >
      <div
        className="
        max-w-6xl
        mx-auto
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-amber-900
          mb-6
        "
        >
          🛒 فروشگاه قهوه
        </h1>

        {/* Filters */}

        <div
          className="
          bg-white/80
          backdrop-blur
          rounded-3xl
          p-5
          mb-8
          grid
          md:grid-cols-2
          gap-4
        "
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی محصول..."
            className="
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-amber-500
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              border
              rounded-xl
              p-3
            "
          >
            <option value="all">همه دسته‌ها</option>

            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            className="
              bg-white
              rounded-3xl
              p-10
              text-center
            "
          >
            محصولی پیدا نشد
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

import ProductCard from "../../components/shop/ProductCard";

import { useProducts } from "../../context/ProductContext";
import calculateFinalPrice from "../../utils/calculateFinalPrice";

const SORT_OPTIONS = [
  { value: "default", label: "پیش‌فرض" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "rating", label: "پرامتیازترین" },
];

function ShopPage() {
  const { products } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );

  const [sort, setSort] = useState("default");

  const maxPossiblePrice = useMemo(() => {
    if (!products.length) return 0;

    return Math.max(
      ...products.map((product) =>
        calculateFinalPrice(
          Number(product.basePrice ?? 0),
          Number(product.discountPercent ?? 0),
        ),
      ),
    );
  }, [products]);

  const [maxPrice, setMaxPrice] = useState(null);

  const priceCeiling = maxPrice ?? maxPossiblePrice;

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  const resetFilters = () => {
    setSearch("");
    setSort("default");
    setMaxPrice(null);
    handleCategoryChange("all");
  };

  const categories = useMemo(() => {
    const result = products.map((product) => product.category);

    return result.filter(
      (item, index, self) =>
        index === self.findIndex((x) => x.slug === item.slug),
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchSearch = (product.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || product.category.slug === category;

      const finalPrice = calculateFinalPrice(
        Number(product.basePrice ?? 0),
        Number(product.discountPercent ?? 0),
      );

      const matchPrice = finalPrice <= priceCeiling;

      return matchSearch && matchCategory && matchPrice;
    });

    const sorted = [...filtered];

    if (sort === "price-asc" || sort === "price-desc") {
      sorted.sort((a, b) => {
        const priceA = calculateFinalPrice(
          Number(a.basePrice ?? 0),
          Number(a.discountPercent ?? 0),
        );
        const priceB = calculateFinalPrice(
          Number(b.basePrice ?? 0),
          Number(b.discountPercent ?? 0),
        );

        return sort === "price-asc" ? priceA - priceB : priceB - priceA;
      });
    } else if (sort === "rating") {
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return sorted;
  }, [products, search, category, sort, priceCeiling]);

  return (
    <div
      className="
      min-h-screen
      p-6
      bg-gradient-to-br
      from-stone-100
      via-amber-50
      to-amber-100
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
          font-black
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
          space-y-4
        "
        >
          <div className="grid md:grid-cols-3 gap-4">
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
              onChange={(e) => handleCategoryChange(e.target.value)}
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

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                border
                rounded-xl
                p-3
              "
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  مرتب‌سازی: {option.label}
                </option>
              ))}
            </select>
          </div>

          {maxPossiblePrice > 0 && (
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-stone-600 shrink-0">
                حداکثر قیمت: {priceCeiling.toLocaleString("fa-IR")} تومان
              </label>

              <input
                type="range"
                min={0}
                max={maxPossiblePrice}
                step={10000}
                value={priceCeiling}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 accent-amber-700"
              />

              {(search || category !== "all" || sort !== "default" || maxPrice !== null) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="shrink-0 text-sm font-semibold text-amber-800 hover:text-amber-600 transition whitespace-nowrap"
                >
                  حذف فیلترها
                </button>
              )}
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div
            className="
              bg-white
              rounded-3xl
              p-12
              text-center
              flex flex-col items-center gap-3
            "
          >
            <FaSadTear className="text-4xl text-amber-300" />
            <p className="font-bold text-stone-700">محصولی پیدا نشد</p>
            <p className="text-sm text-stone-500">
              فیلترها را تغییر دهید یا جستجوی دیگری امتحان کنید
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 bg-amber-800 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl transition"
            >
              حذف همه فیلترها
            </button>
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

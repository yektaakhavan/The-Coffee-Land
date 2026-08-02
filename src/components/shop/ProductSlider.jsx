import { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import ProductCard from "./ProductCard";

function ProductSlider({ products = [], title }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8 * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <div className="my-12">
      {/* Title */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gray-200"></div>

        <span className="text-2xl font-bold text-gray-800 px-4 border-x-2 border-amber-500 whitespace-nowrap">
          {title}
        </span>

        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Slider */}
      <div className="relative group/slider">
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label="محصولات بعدی"
          className="
            hidden sm:flex
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 items-center justify-center
            rounded-full bg-white text-amber-800 shadow-lg
            hover:bg-amber-800 hover:text-white
            transition
            opacity-0 group-hover/slider:opacity-100
          "
        >
          <HiChevronRight className="text-xl" />
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label="محصولات قبلی"
          className="
            hidden sm:flex
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 items-center justify-center
            rounded-full bg-white text-amber-800 shadow-lg
            hover:bg-amber-800 hover:text-white
            transition
            opacity-0 group-hover/slider:opacity-100
          "
        >
          <HiChevronLeft className="text-xl" />
        </button>

        <div
          ref={scrollerRef}
          className="
            flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
            px-1 pb-4
            [&::-webkit-scrollbar]:h-1.5
            [&::-webkit-scrollbar-thumb]:bg-amber-200
            [&::-webkit-scrollbar-thumb]:rounded-full
          "
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="
                snap-start shrink-0
                w-[80%] sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[19%]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;

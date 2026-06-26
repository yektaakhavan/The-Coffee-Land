import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../../data/ProductCard";

// استایل Swiper
import "swiper/css";
import "swiper/css/navigation";

const ProductSlider = ({ products, title }) => {
  return (
    <div className="my-12">
      {/* عنوان */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-2xl font-bold text-gray-800 px-4 border-x-2 border-amber-500">
          {title}
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* اسلایدر */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="!px-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* استایل دکمه‌های ناوبری */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #b45309;
          width: 30px;
          height: 30px;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;

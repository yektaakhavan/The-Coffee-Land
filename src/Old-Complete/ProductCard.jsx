// // import React from "react";
// // import products from "../../data/products";

// // function ProductCard() {
// //   return (
// //     <div className="flex flex-wrap gap-7 my-11">
// //       {products.map((product) => (
// //         <div key={product.id} className="border-2 p-3 border-emerald-950 w-72">
// //           <div className="flex justify-between">
// //             <h3>{product.name}</h3>

// //             <p className="bg-amber-100 py-2 px-3 text-black">
// //               {product.basePrice}
// //             </p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default ProductCard;

// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";

// // const ProductCard = ({ product }) => {
// //   const [isLiked, setIsLiked] = useState(false);
// //   const [selectedSize, setSelectedSize] = useState(null);

// //   // فرمت قیمت
// //   const formatPrice = (price) => {
// //     return price.toLocaleString("fa-IR") + " تومان";
// //   };

// //   // محاسبه قیمت با تخفیف
// //   const getFinalPrice = () => {
// //     if (product.discountPercent > 0) {
// //       return Math.round(
// //         product.basePrice * (1 - product.discountPercent / 100),
// //       );
// //     }
// //     return product.basePrice;
// //   };

// //   const finalPrice = getFinalPrice();

// //   return (
// //     <div className="group w-full max-w-[280px] mx-auto">
// //       <div className="relative">
// //         {/* کارت با طراحی منحنی */}
// //         <div className="relative bg-white rounded-[35px] shadow-md hover:shadow-xl transition-all duration-300 overflow-visible">
// //           {/* منحنی پایین کارت - افکت hover */}
// //           <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[85px] h-[85px] border-b-2 border-amber-200 rounded-full -z-10 group-hover:bottom-[-5%] transition-all duration-300"></div>

// //           {/* محتوای کارت با ماسک منحنی */}
// //           <div
// //             className="relative p-4 pt-8"
// //             style={{
// //               borderRadius: "35px",
// //               background: "#fff",
// //               maskImage: `
// //                 radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
// //                 radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
// //                 radial-gradient(80px at 50% calc(100% + sin(60deg) * 80px), transparent 100%, #000 calc(100% + 1px)) 0 calc(35px * (sin(60deg) - 1)) no-repeat,
// //                 linear-gradient(90deg, #000 calc(50% - (80px + 35px) * cos(60deg)), transparent 0 calc(50% + (80px + 35px) * cos(60deg)), #000 0)
// //               `,
// //               maskSize: "100% 100%",
// //               WebkitMaskImage: `
// //                 radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
// //                 radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
// //                 radial-gradient(80px at 50% calc(100% + sin(60deg) * 80px), transparent 100%, #000 calc(100% + 1px)) 0 calc(35px * (sin(60deg) - 1)) no-repeat,
// //                 linear-gradient(90deg, #000 calc(50% - (80px + 35px) * cos(60deg)), transparent 0 calc(50% + (80px + 35px) * cos(60deg)), #000 0)
// //               `,
// //               WebkitMaskSize: "100% 100%",
// //             }}
// //           >
// //             {/* دکمه لایک */}
// //             <button
// //               onClick={() => setIsLiked(!isLiked)}
// //               className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md"
// //             >
// //               <svg
// //                 viewBox="0 0 24 24"
// //                 className={`w-5 h-5 transition-colors ${isLiked ? "text-red-500 fill-red-500" : "text-gray-600 fill-none"}`}
// //                 xmlns="http://www.w3.org/2000/svg"
// //               >
// //                 <path
// //                   d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z"
// //                   stroke="currentColor"
// //                   strokeWidth="1.5"
// //                 />
// //               </svg>
// //             </button>

// //             {/* نشان تخفیف */}
// //             {product.discountPercent > 0 && (
// //               <div className="absolute left-3 top-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
// //                 -{product.discountPercent}%
// //               </div>
// //             )}

// //             {/* تصویر محصول */}
// //             <div className="relative overflow-hidden">
// //               <img
// //                 src={product.image}
// //                 alt={product.name}
// //                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-3xl"
// //               />
// //             </div>

// //             {/* عنوان */}
// //             <Link to={`/product/${product.slug}`} className="block mt-3">
// //               <h3 className="text-base font-bold text-gray-800 hover:text-amber-700 transition-colors text-right line-clamp-1">
// //                 {product.name}
// //               </h3>
// //             </Link>

// //             {/* کشور مبدا */}
// //             <p className="text-sm text-gray-500 mt-0.5 text-right">
// //               {product.origin}
// //             </p>

//             {/* نت‌های طعم */}
//             <div className="flex flex-wrap gap-1.5 mt-2 justify-end">
//               {product.flavorNotes.slice(0, 3).map((note, index) => (
//                 <span
//                   key={index}
//                   className="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-full border border-amber-100"
//                 >
//                   {note}
//                 </span>
//               ))}
//             </div>

//             {/* سایزها (وزن‌های قهوه) */}
//             <div className="flex flex-wrap gap-1.5 mt-3 justify-end">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
//                     selectedSize === size
//                       ? "bg-amber-600 text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-amber-100"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>

//             {/* قیمت و دکمه خرید */}
//             <div className="flex items-center justify-between mt-4">
//               <div className="flex flex-col items-end">
//                 {product.discountPercent > 0 && (
//                   <span className="text-sm text-gray-400 line-through">
//                     {formatPrice(product.basePrice)}
//                   </span>
//                 )}
//                 <span className="text-lg font-bold text-amber-700">
//                   {formatPrice(finalPrice)}
//                 </span>
//               </div>

//               <button className="w-9 h-9 rounded-full bg-amber-700 hover:bg-amber-800 transition-all flex items-center justify-center group-hover:w-[80px] group-hover:rounded-full">
//                 <span className="flex items-center gap-2 text-white text-sm">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="18"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//                     <line x1="3" y1="6" x2="21" y2="6" />
//                     <path d="M16 10a4 4 0 0 1-8 0" />
//                   </svg>
//                   <span className="hidden group-hover:inline">خرید</span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // فرمت قیمت
  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };

  // محاسبه قیمت با تخفیف
  const getFinalPrice = () => {
    if (product.discountPercent > 0) {
      return Math.round(
        product.basePrice * (1 - product.discountPercent / 100),
      );
    }
    return product.basePrice;
  };

  const finalPrice = getFinalPrice();

  // مقدار پیش‌فرض برای sizes
  const sizes = product.sizes || ["250g", "500g", "1kg"];
  const flavorNotes = product.flavorNotes || [];

  return (
    <div className="group w-full max-w-[280px] mx-auto">
      <div className="relative">
        {/* کارت با طراحی منحنی */}
        <div className="relative bg-white rounded-[35px] shadow-md hover:shadow-xl transition-all duration-300 overflow-visible">
          {/* منحنی پایین کارت - افکت hover */}
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[85px] h-[85px] border-b-2 border-amber-200 rounded-full -z-10 group-hover:bottom-[-5%] transition-all duration-300"></div>

          {/* محتوای کارت با ماسک منحنی */}
          <div
            className="relative p-4 pt-8"
            style={{
              borderRadius: "35px",
              background: "#fff",
              maskImage: `
                radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
                radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
                radial-gradient(80px at 50% calc(100% + sin(60deg) * 80px), transparent 100%, #000 calc(100% + 1px)) 0 calc(35px * (sin(60deg) - 1)) no-repeat,
                linear-gradient(90deg, #000 calc(50% - (80px + 35px) * cos(60deg)), transparent 0 calc(50% + (80px + 35px) * cos(60deg)), #000 0)
              `,
              maskSize: "100% 100%",
              WebkitMaskImage: `
                radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
                radial-gradient(50% 100% at top, #000 calc(100% - 1px), transparent) 100% / calc(2 * 35px) 35px no-repeat,
                radial-gradient(80px at 50% calc(100% + sin(60deg) * 80px), transparent 100%, #000 calc(100% + 1px)) 0 calc(35px * (sin(60deg) - 1)) no-repeat,
                linear-gradient(90deg, #000 calc(50% - (80px + 35px) * cos(60deg)), transparent 0 calc(50% + (80px + 35px) * cos(60deg)), #000 0)
              `,
              WebkitMaskSize: "100% 100%",
            }}
          >
            {/* دکمه لایک */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                className={`w-5 h-5 transition-colors ${isLiked ? "text-red-500 fill-red-500" : "text-gray-600 fill-none"}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            {/* نشان تخفیف */}
            {product.discountPercent > 0 && (
              <div className="absolute left-3 top-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                -{product.discountPercent}%
              </div>
            )}

            {/* نشان ویژه */}
            {product.isFeatured && (
              <div className="absolute left-3 top-14 z-10 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                ویژه
              </div>
            )}

            {/* تصویر محصول */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-3xl"
              />
            </div>

            {/* عنوان */}
            <Link to={`/product/${product.slug}`} className="block mt-3">
              <h3 className="text-base font-bold text-gray-800 hover:text-amber-700 transition-colors text-right line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* کشور مبدا */}
            <p className="text-sm text-gray-500 mt-0.5 text-right">
              {product.origin}
            </p>

            {/* نت‌های طعم */}
            {flavorNotes.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 justify-end">
                {flavorNotes.slice(0, 3).map((note, index) => (
                  <span
                    key={index}
                    className="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-full border border-amber-100"
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}

            {/* سایزها (وزن‌های قهوه) */}
            <div className="flex flex-wrap gap-1.5 mt-3 justify-end">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    selectedSize === size
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-amber-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* قیمت و دکمه خرید */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col items-end">
                {product.discountPercent > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.basePrice)}
                  </span>
                )}
                <span className="text-lg font-bold text-amber-700">
                  {formatPrice(finalPrice)}
                </span>
              </div>

              <button className="w-9 h-9 rounded-full bg-amber-700 hover:bg-amber-800 transition-all flex items-center justify-center group-hover:w-[80px] group-hover:rounded-full">
                <span className="flex items-center gap-2 text-white text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="hidden group-hover:inline">خرید</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

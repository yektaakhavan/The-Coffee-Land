// import { useForm } from "react-hook-form";

// import { useProducts } from "../../context/ProductContext";

// function AddProductPage() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const { addProduct } = useProducts();

//   const onSubmit = (data) => {
//     const newProduct = {
//       id: Date.now(),

//       name: data.name,

//       slug: data.name.toLowerCase().replaceAll(" ", "-"),

//       images: [data.image],

//       category: {
//         id: Date.now(),
//         title: data.category,
//       },

//       basePrice: Number(data.price),

//       discountPercent: 0,

//       inventory: {
//         stock: Number(data.stock),
//       },

//       description: data.description,

//       rating: 0,

//       status: "active",

//       createdAt: new Date().toISOString(),
//     };

//     addProduct(newProduct);

//     reset();
//   };
//   return (
//     <div className="p-6">
//       <h1
//         className="
//         text-3xl
//         font-bold
//         mb-8
//       "
//       >
//         افزودن محصول جدید
//       </h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="
//           bg-white
//           rounded-3xl
//           shadow-lg
//           p-8
//           space-y-6
//         "
//       >
//         {/* Product Name */}

//         <div>
//           <label className="block mb-2 font-semibold">نام محصول</label>

//           <input
//             {...register("name", {
//               required: "نام محصول الزامی است",
//             })}
//             className="
//               w-full
//               border
//               rounded-xl
//               p-3
//               outline-none
//               focus:ring-2
//               focus:ring-purple-400
//             "
//             placeholder="مثلاً قهوه اسپرسو"
//           />

//           {errors.name && (
//             <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
//           )}
//         </div>

//         {/* Price */}

//         <div>
//           <label className="block mb-2 font-semibold">قیمت</label>

//           <input
//             type="number"
//             {...register("price", {
//               required: "قیمت الزامی است",
//             })}
//             className="
//               w-full
//               border
//               rounded-xl
//               p-3
//             "
//             placeholder="250000"
//           />
//         </div>

//         {/* Category */}

//         <div>
//           <label className="block mb-2 font-semibold">دسته بندی</label>

//           <select
//             {...register("category", {
//               required: "انتخاب دسته بندی الزامی است",
//             })}
//             className="
//               w-full
//               border
//               rounded-xl
//               p-3
//             "
//           >
//             <option value="">انتخاب کنید</option>

//             <option value="coffee">قهوه</option>

//             <option value="equipment">تجهیزات</option>
//           </select>
//         </div>

//         {/* Discount */}
//         <div>
//           <label className="block mb-2 font-semibold">درصد تخفیف</label>

//           <input
//             type="number"
//             {...register("discountPercent")}
//             className="
// w-full
// border
// rounded-xl
// p-3
// "
//           />
//         </div>
//         {/* Stock */}

//         <div>
//           <label className="block mb-2 font-semibold">موجودی</label>

//           <input
//             type="number"
//             {...register("stock")}
//             className="
//               w-full
//               border
//               rounded-xl
//               p-3
//             "
//           />
//         </div>

//         {/* Image */}

//         <div>
//           <label className="block mb-2 font-semibold">تصویر محصول</label>

//           <input
//             {...register("image", {
//               required: "تصویر محصول الزامی است",
//             })}
//             className="
// w-full
// border
// rounded-xl
// p-3
// "
//             placeholder="آدرس تصویر محصول"
//           />

//           {errors.image && (
//             <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
//           )}
//         </div>

//         {/* Description */}

//         <div>
//           <label className="block mb-2 font-semibold">توضیحات</label>

//           <textarea
//             {...register("description")}
//             rows="5"
//             className="
//               w-full
//               border
//               rounded-xl
//               p-3
//             "
//           />
//         </div>

//         <button
//           type="submit"
//           className="
//             bg-purple-600
//             hover:bg-purple-700
//             text-white
//             px-8
//             py-3
//             rounded-xl
//             transition
//           "
//         >
//           ذخیره محصول
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProductPage;

import ProductForm from "../../components/admin/product/ProductForm";

function AddProductPage() {
  return (
    <section className="space-y-8">
      <ProductForm mode="create" />
    </section>
    
  );
}

export default AddProductPage;

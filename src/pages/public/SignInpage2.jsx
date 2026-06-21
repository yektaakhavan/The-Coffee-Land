
// با Controller Component

// import React, { useEffect } from "react";
// import { useForm, Controller } from "react-hook-form"; // <- Controller رو اضافه کن

// function SignInPage() {
//   const {
//     control, // <- به جای register، از control استفاده میکنیم
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     watch,
//     setValue,
//     setError,
//   } = useForm({
//     defaultValues: {
//       identifier: "",
//       password: "",
//       rememberMe: false,
//     },
//   });

//   const watchedValues = watch();

//   const saveToLocalStorage = (identifier, rememberMe) => {
//     if (rememberMe) {
//       localStorage.setItem("savedIdentifier", identifier);
//     } else {
//       localStorage.removeItem("savedIdentifier");
//     }
//   };

//   useEffect(() => {
//     const savedIdentifier = localStorage.getItem("savedIdentifier");
//     if (savedIdentifier) {
//       setValue("identifier", savedIdentifier);
//       setValue("rememberMe", true);
//     }
//   }, [setValue]);

//   const validateIdentifier = (value) => {
//     if (!value) return "لطفا ایمیل یا شماره همراه را وارد کنید";

//     const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
//     const isPhone = /^09[0-9]{9}$/.test(value);

//     if (!isEmail && !isPhone) {
//       return "ایمیل نامعتبر یا شماره همراه باید با 09 شروع شود";
//     }

//     return true;
//   };

//   const onSubmit = async (data) => {
//     console.log(data);
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     if (data.password !== "123456") {
//       setError("password", {
//         type: "manual",
//         message: "رمز عبور اشتباه است",
//       });
//       return;
//     }

//     saveToLocalStorage(data.identifier, data.rememberMe);
//     alert("ورود موفقیت آمیز بود!");
//     reset();
//   };

//   const Spinner = () => (
//     <svg className="animate-spin h-4 w-4 mr-2 inline" viewBox="0 0 24 24">
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//         fill="none"
//       />
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//       />
//     </svg>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
//         <div className="flex flex-col">
//           <div className="flex flex-col text-center">
//             ☕
//             <p className="text-amber-950 font-bold mb-5">ورود به سرزمین ی قهوه</p>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               {/* Controller برای ایمیل/شماره همراه */}
//               <Controller
//                 name="identifier"
//                 control={control}
//                 rules={{ validate: validateIdentifier }}
//                 render={({ field }) => (
//                   <input
//                     {...field} // <- این شامل onChange، onBlur، value، ref هست
//                     type="text"
//                     placeholder="ایمیل یا شماره همراه"
//                     className={`w-full px-3 py-2 border rounded-lg ${
//                       errors.identifier ? "border-red-500" : "border-gray-300"
//                     }`}
//                   />
//                 )}
//               />
//               {errors.identifier && (
//                 <p className="text-red-500 text-xs">
//                   {errors.identifier.message}
//                 </p>
//               )}

//               {/* Controller برای رمز عبور */}
//               <Controller
//                 name="password"
//                 control={control}
//                 rules={{
//                   required: "لطفا رمز عبور خود را وارد کنید",
//                   minLength: {
//                     value: 6,
//                     message: "رمز عبور باید حداقل 6 کاراکتر باشد",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type="password"
//                     placeholder="رمز عبور"
//                     className={`w-full px-3 py-2 border rounded-lg mt-4 ${
//                       errors.password ? "border-red-500" : "border-gray-300"
//                     }`}
//                   />
//                 )}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </p>
//               )}

//               {/* Controller برای چک باکس */}
//               <div className="flex items-center justify-between mt-4">
//                 <label className="flex items-center text-sm text-gray-600">
//                   <Controller
//                     name="rememberMe"
//                     control={control}
//                     render={({ field: { value, onChange } }) => (
//                       <input
//                         type="checkbox"
//                         checked={value}
//                         onChange={onChange}
//                         className="mr-2 rounded border-gray-300"
//                       />
//                     )}
//                   />
//                   مرا به خاطر بسپار
//                 </label>
//                 <a
//                   href="#"
//                   className="text-sm text-amber-700 hover:text-amber-900"
//                 >
//                   رمز عبور را فراموش کرده‌اید؟
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full bg-amber-800 text-white py-2 rounded-lg mt-6 flex items-center justify-center ${
//                   isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Spinner />
//                     در حال ورود...
//                   </>
//                 ) : (
//                   "ورود"
//                 )}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => reset()}
//                 className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-3 hover:bg-gray-400 transition"
//               >
//                 پاک کردن فرم
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignInPage;

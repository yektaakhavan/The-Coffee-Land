// import React from "react";
// import { useForm } from "react-hook-form";

// function SignUpPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("داده‌های فرم:", data);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
//         <div className="flex flex-col">
//           <div className="text-center mb-6">
//             <span className="text-5xl block mb-3">☕</span>
//             <h1 className="text-2xl font-bold text-amber-900">
//               عضویت در سرزمین قهوه
//             </h1>
//             <p className="text-gray-500 text-sm mt-2">
//               به خانواده قهوه دوست ها بپیوندید
//             </p>
//           </div>
//           <Form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 نام و نام خانوادگی
//               </label>
//               <input
//                 {...register("fullName", { required: "فیلد اجباری" })}
//                 type="text"
//                 placeholder="مثال : سارا احمدی"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               />
//               {errors.fullName && (
//                 <p className="text-red-500 text-xs">
//                   {errors.fullName.message}
//                 </p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 ایمیل
//               </label>
//               <input
//                 {...register("email", {
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "ایمیل نامعتبر",
//                   },
//                 })}
//                 type="email"
//                 placeholder="email@example.com"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 شماره تماس
//               </label>
//               <input
//                 {...register(
//                   "phoneNumber",
//                   {
//                     pattern: {
//                       value: /^09[0-9]{9}$/,
//                       message: "شماره موبایل نامعتبر",
//                     },
//                   },
//                   { required: "فیلد اجباری" },
//                 )}
//                 type="text"
//                 placeholder="09110001112"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               />
//               {errors.phoneNumber && (
//                 <p className="text-red-500 text-xs">
//                   {errors.phoneNumber.message}
//                 </p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 رمز عبور
//               </label>

//               <input
//                 {...register(
//                   "password",
//                   {
//                     minLength: {
//                       value: 6,
//                       message: "رمز عبور حداقل ۶ کاراکتر",
//                     },
//                   },
//                   { required: "فیلد اجباری" },
//                 )}
//                 type="password"
//                 placeholder="******"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//               {/* چک باکس مرا به خاطر بسپار */}
//               <div className="flex items-center justify-between mt-4">
//                 <label className="flex items-center text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     {...register("rememberMe")}
//                     className="me-2 rounded border-gray-300"
//                   />
//                   مرا به خاطر بسپار
//                 </label>

//               </div>

//               {/* دکمه عضویت */}
//             <button
//               type="submit"
//               className="w-full bg-amber-800 text-white py-2 rounded-lg mt-6"
//             >
//               عضویت
//             </button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUpPage;

// import { useForm } from "react-hook-form";

// function SignUpPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//   } = useForm({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       phone: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     // شبیه‌سازی ارسال به سرور
//     console.log("داده‌های فرم:", data);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     alert("ثبت‌نام با موفقیت انجام شد!");
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
//       <h2>فرم ثبت‌نام</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* فیلد نام و نام خانوادگی */}
//         <div style={{ marginBottom: "15px" }}>
//           <label>نام و نام خانوادگی:</label>
//           <input
//             type="text"
//             {...register("fullName", {
//               required: "نام و نام خانوادگی الزامی است",
//               minLength: {
//                 value: 3,
//                 message: "حداقل ۳ کاراکتر وارد کنید",
//               },
//               maxLength: {
//                 value: 50,
//                 message: "حداکثر ۵۰ کاراکتر مجاز است",
//               },
//             })}
//             placeholder="علی رضایی"
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "5px",
//               border: errors.fullName ? "1px solid red" : "1px solid #ccc",
//             }}
//           />
//           {errors.fullName && (
//             <span style={{ color: "red", fontSize: "12px" }}>
//               {errors.fullName.message}
//             </span>
//           )}
//         </div>

//         {/* فیلد ایمیل */}
//         <div style={{ marginBottom: "15px" }}>
//           <label>ایمیل:</label>
//           <input
//             type="email"
//             {...register("email", {
//               required: "ایمیل الزامی است",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "ایمیل نامعتبر است",
//               },
//             })}
//             placeholder="example@gmail.com"
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "5px",
//               border: errors.email ? "1px solid red" : "1px solid #ccc",
//             }}
//           />
//           {errors.email && (
//             <span style={{ color: "red", fontSize: "12px" }}>
//               {errors.email.message}
//             </span>
//           )}
//         </div>

//         {/* فیلد شماره همراه */}
//         <div style={{ marginBottom: "15px" }}>
//           <label>شماره همراه:</label>
//           <input
//             type="tel"
//             {...register("phone", {
//               required: "شماره همراه الزامی است",
//               pattern: {
//                 value: /^09[0-9]{9}$/,
//                 message: "شماره همراه باید با 09 شروع شود و 11 رقم باشد",
//               },
//             })}
//             placeholder="09123456789"
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "5px",
//               border: errors.phone ? "1px solid red" : "1px solid #ccc",
//             }}
//           />
//           {errors.phone && (
//             <span style={{ color: "red", fontSize: "12px" }}>
//               {errors.phone.message}
//             </span>
//           )}
//         </div>

//         {/* فیلد رمز عبور */}
//         <div style={{ marginBottom: "15px" }}>
//           <label>رمز عبور:</label>
//           <input
//             type="password"
//             {...register("password", {
//               required: "رمز عبور الزامی است",
//               minLength: {
//                 value: 6,
//                 message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
//               },
//               maxLength: {
//                 value: 20,
//                 message: "رمز عبور حداکثر ۲۰ کاراکتر",
//               },
//             })}
//             placeholder="******"
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "5px",
//               border: errors.password ? "1px solid red" : "1px solid #ccc",
//             }}
//           />
//           {errors.password && (
//             <span style={{ color: "red", fontSize: "12px" }}>
//               {errors.password.message}
//             </span>
//           )}
//         </div>

//         {/* نمایش رمز عبور (اختیاری) */}
//         <div style={{ marginBottom: "15px" }}>
//           <label>
//             <input type="checkbox" {...register("showPassword")} /> نمایش رمز
//             عبور
//           </label>
//         </div>

//         {/* دکمه ارسال */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             cursor: isSubmitting ? "not-allowed" : "pointer",
//           }}
//         >
//           {isSubmitting ? "در حال ارسال..." : "ثبت‌نام"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUpPage;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema } from "../../validation/checkoutSchema";

function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold mb-8">اطلاعات گیرنده</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <input
            {...register("fullName")}
            placeholder="نام و نام خانوادگی"
            className="border rounded-xl p-4 w-full"
          />

          <p className="text-red-500 text-sm mt-2">
            {errors.fullName?.message}
          </p>
        </div>

        <div>
          <input
            {...register("phone")}
            placeholder="شماره موبایل"
            className="border rounded-xl p-4 w-full"
          />

          <p className="text-red-500 text-sm mt-2">{errors.phone?.message}</p>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="ایمیل"
            className="border rounded-xl p-4 w-full"
          />

          <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
        </div>

        <div>
          <input
            {...register("postalCode")}
            placeholder="کد پستی"
            className="border rounded-xl p-4 w-full"
          />

          <p className="text-red-500 text-sm mt-2">
            {errors.postalCode?.message}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <textarea
          rows={5}
          {...register("address")}
          placeholder="آدرس کامل"
          className="border rounded-xl p-4 w-full"
        />

        <p className="text-red-500 text-sm mt-2">{errors.address?.message}</p>
      </div>

      <button
        className="
        mt-8
        w-full
        bg-amber-700
        hover:bg-amber-800
        text-white
        py-4
        rounded-2xl
        font-bold
        transition
        "
      >
        ادامه
      </button>
    </form>
  );
}

export default CheckoutForm;

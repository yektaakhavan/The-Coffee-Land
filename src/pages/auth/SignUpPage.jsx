import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
    setError,
  } = useForm({
    mode: "onChange",
  });

  // Derived State

  // 4 condition for password
  const password = watch("password") || "";
  //وقتی چیزی تایپ نکنی مقدارش "" است (falsey)، پس چیزی render نمی‌شود.
  //وقتی تایپ کنی، true می‌شود و strength نمایش داده می‌شود.

  const hasLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Password Score (optimized with memo)
  const score = useMemo(() => {
    let s = 0;
    if (hasLength) s += 1;
    if (hasUpperCase) s += 1;
    if (hasNumber) s += 1;
    if (hasSpecialChar) s += 1;
    return s;
  }, [hasLength, hasUpperCase, hasNumber, hasSpecialChar]);

  const navigate = useNavigate();

  // Function
  // وقتی کاربر فرم رو submit می‌کنه، React Hook Form همه مقدار inputها رو جمع می‌کنه و داخل data می‌ریزه.
  const onSubmit = async (data) => {
    // console.log(data);
    // localStorage.setItem("registeredUser", JSON.stringify(data));
    //در کد بالا کل data ذخیره میشوند اما ما ذخیره ی ConfirmPassword را نیاز نداریم پس میتونم به شکل زیر بنویسیم.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newUser = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.email === "admin@gmail.com" ? "admin" : "customer",
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    //users.some:می‌گردد ببیند حداقل یک کاربر با این ایمیل هست یا نه.
    const isUserExist = users.some((user) => user.email === data.email);

    if (isUserExist) {
      setError("email", {
        type: "manual",
        message: "این ایمیل قبلا ثبت شده است",
      });
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // localStorage.setItem("registeredUser", JSON.stringify(newUser));

    reset();

    navigate("/auth/sign-in");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col">
          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">☕</span>
            <h1 className="text-2xl font-bold text-amber-900">
              عضویت در سرزمین قهوه
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              به خانواده قهوه دوست ها بپیوندید
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                نام و نام خانوادگی
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("fullName", {
                  required: "این فیلد اجباری است",
                })}
                type="text"
                placeholder="مثال : احمد احمدی"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ایمیل
              </label>

              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("email", {
                  required: "ایمیل اجباری است",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "ایمیل نامعتبر است",
                  },
                })}
                type="email"
                placeholder="example@gmail.com"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                رمزعبور
              </label>

              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("password", {
                  required: "رمز عبور اجباری است",
                  minLength: {
                    value: 8,
                    message: "رمز عبور باید حداقل 8 کاراکتر باشد",
                  },
                  validate: (value) => {
                    if (!/[A-Z]/.test(value)) {
                      return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";
                    }
                    if (!/[0-9]/.test(value)) {
                      return "رمز عبور باید حداقل یک عدد داشته باشد";
                    }
                    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
                      return "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد";
                    }
                    return true;
                  },
                })}
                type="password"
                placeholder="********"
              />

              {password && (
                <p className="text-xs mt-1">
                  قدرت رمز:{" "}
                  {score <= 1 ? "ضعیف 🔴" : score === 2 ? "متوسط 🟡" : "قوی 🟢"}
                </p>
              )}

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                تکرار رمز عبور
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("confirmPassword", {
                  required: "رمز عبور خود را تکرار کنید",
                  validate: (value) =>
                    value === password || "رمز عبور یکسان نیست",
                })}
                type="password"
                placeholder="********"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* Sign In */}
            <div className="text-center mt-4 text-sm text-gray-600">
              حساب کاربری دارید؟{" "}
              <Link
                to="/auth/sign-in"
                className="text-amber-700 font-medium hover:text-amber-900"
              >
                ورود به The Coffee House
              </Link>
            </div>
            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full bg-amber-800 text-white py-2 rounded-lg mt-6 flex items-center justify-center
                ${isSubmitting || !isValid ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {isSubmitting ? "در حال ثبت..." : "عضویت"}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={() => reset()}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg mt-3"
            >
              پاک کردن فرم
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

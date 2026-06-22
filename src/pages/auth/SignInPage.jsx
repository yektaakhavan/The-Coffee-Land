// با Register
// برای پروژه من استفاده از Register بجای Controller بهتره چون فقط یه فرم سادس

import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineLogin } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserInfoContext } from "../../context/AuthContext";

function SignInPage() {
  const { login } = useContext(UserInfoContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const validateIdentifier = useCallback((value) => {
    if (!value) return "لطفا ایمیل یا شماره همراه را وارد کنید";

    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    const isPhone = /^09[0-9]{9}$/.test(value);

    if (!isEmail && !isPhone) {
      return "ایمیل نامعتبر یا شماره همراه باید با 09 شروع شود";
    }

    return true;
  }, []);

  useEffect(() => {
    const savedIdentifier = localStorage.getItem("savedIdentifier");

    if (savedIdentifier) {
      setValue("identifier", savedIdentifier);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  // ذخیره اطلاعات در localStorage وقتی فرم با موفقیت ارسال شد
  const saveToLocalStorage = (identifier, rememberMe) => {
    // ذخیره remember me
    if (rememberMe) {
      localStorage.setItem("savedIdentifier", identifier);
    } else {
      localStorage.removeItem("savedIdentifier");
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 500)); // fake loading

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === data.identifier && u.password === data.password,
    );

    // کاربر وجود ندارد
    if (!foundUser) {
      setError("identifier", {
        type: "manual",
        message: "ایمیل یا رمز عبور اشتباه است",
      });
      return;
    }

    login(foundUser);

    const from = location.state?.from?.pathname;

    navigate(from || (foundUser.role === "admin" ? "/admin" : "/"), {
      replace: true,
    });

    reset();
  };

  const Spinner = () => (
    <svg className="animate-spin h-4 w-4 mr-2 inline" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col">
          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">☕</span>
            <h1 className="text-2xl font-bold text-amber-900">
              ورود به سرزمین قهوه
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              برای ادامه خرید وارد شوید
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* identifier */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ایمیل یا شماره همراه
              </label>

              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("identifier", {
                  validate: validateIdentifier,
                })}
                type="text"
                placeholder="example@gmail.com یا 09123456789"
              />

              {errors.identifier && (
                <p className="text-red-500 text-xs">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                رمز عبور
              </label>

              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("password", {
                  required: "لطفا رمز عبور خود را وارد کنید",
                  minLength: {
                    value: 6,
                    message: "رمز عبور حداقل 6 کاراکتر باشد",
                  },
                })}
                type="password"
                placeholder="******"
              />

              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* remember */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="me-2"
                />
                مرا به خاطر بسپار
              </label>
            </div>

            {/* Sign Up */}
            <div className="text-center mt-4 text-sm text-gray-600">
              حساب کاربری ندارید؟{" "}
              <Link
                to="/auth/sign-up"
                className="text-amber-700 font-medium hover:text-amber-900"
              >
                عضویت در The Coffee House
              </Link>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full bg-amber-800 text-white py-2 rounded-lg mt-6 flex items-center justify-center
                ${isSubmitting || !isValid ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  در حال ورود...
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <HiOutlineLogin className="text-xl" />
                  <span>ورود</span>
                </div>
              )}
            </button>

            {/* reset */}
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

export default SignInPage;

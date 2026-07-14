import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3, "نام حداقل باید ۳ کاراکتر باشد"),

  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  email: z
    .string()
    .email("ایمیل معتبر نیست"),

  postalCode: z
    .string()
    .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),

  address: z
    .string()
    .min(15, "آدرس کامل را وارد کنید"),
});
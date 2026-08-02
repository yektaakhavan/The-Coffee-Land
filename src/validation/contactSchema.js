import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, "نام حداقل باید ۳ کاراکتر باشد"),

  email: z
    .string()
    .email("ایمیل معتبر نیست"),

  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .or(z.literal(""))
    .optional(),

  subject: z
    .string()
    .min(3, "موضوع را وارد کنید"),

  message: z
    .string()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

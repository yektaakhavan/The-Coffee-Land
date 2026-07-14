import product01 from "../assets/images/product/01.jpg";
import product02 from "../assets/images/product/02.jpg";
import product03 from "../assets/images/product/03.jpg";
import product04 from "../assets/images/product/04.jpg";
import product05 from "../assets/images/product/05.jpg";
import product06 from "../assets/images/product/06.jpg";

const products = [
  {
    id: 1,
    name: "قهوه عربیکا اتیوپی",
    slug: "ethiopia-yirgacheffe",
    category: "single-origin",

    images: [product01, product02, product03],

    roastLevel: "Light",
    origin: "اتیوپی",
    process: "شسته",

    basePrice: 180000,
    discountPercent: 10,
    finalPrice: 162000,

    stock: 45,
    inStock: true,

    rating: 4.8,
    reviewCount: 24,

    flavorNotes: ["بلوبری", "شکلات تلخ", "گل یاس"],

    acidity: "بالا",
    bitterness: "متوسط",
    body: "سبک تا متوسط",

    description: "قهوه‌ای خوش‌عطر با اسیدیته بالا و نت‌های میوه‌ای و گلی.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,
    isActive: true,
  },

  {
    id: 2,
    name: "قهوه کلمبیا سوپریمو",
    slug: "colombia-supremo",
    category: "single-origin",

    images: [product02, product03, product04],

    roastLevel: "Medium",
    origin: "کلمبیا",
    process: "شسته",

    basePrice: 160000,
    discountPercent: 0,
    finalPrice: 160000,

    stock: 67,
    inStock: true,

    rating: 4.6,
    reviewCount: 31,

    flavorNotes: ["کارامل", "آجیل", "سیب قرمز"],

    acidity: "متوسط",
    bitterness: "متوسط",
    body: "متوسط",

    description: "طعمی متعادل با شیرینی کاراملی و رایحه دلچسب.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,
    isActive: true,
  },

  {
    id: 3,
    name: "قهوه برزیل سانتوس",
    slug: "brazil-santos",
    category: "single-origin",

    images: [product03, product04, product05],

    roastLevel: "Medium Dark",
    origin: "برزیل",
    process: "طبیعی",

    basePrice: 140000,
    discountPercent: 15,
    finalPrice: 119000,

    stock: 92,
    inStock: true,

    rating: 4.5,
    reviewCount: 18,

    flavorNotes: ["شکلات", "فندق"],

    acidity: "پایین",
    bitterness: "متوسط",
    body: "سنگین",

    description: "قهوه‌ای کلاسیک با بادی سنگین و طعم شکلاتی.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: false,
    isActive: true,
  },

  {
    id: 4,
    name: "قهوه کنیا AA",
    slug: "kenya-aa",
    category: "single-origin",

    images: [product04, product05, product06],

    roastLevel: "Light Medium",
    origin: "کنیا",
    process: "شسته",

    basePrice: 200000,
    discountPercent: 0,
    finalPrice: 200000,

    stock: 0,
    inStock: false,

    rating: 4.9,
    reviewCount: 12,

    flavorNotes: ["مرکبات", "انگور سیاه"],

    acidity: "بالا",
    bitterness: "پایین",
    body: "متوسط",

    description: "اسیدیته روشن، رایحه مرکبات و طعمی پیچیده.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,
    isActive: true,
  },

  {
    id: 5,
    name: "اسپرسو بلند ایتالیایی",
    slug: "italian-espresso",
    category: "espresso-blend",

    images: [product05, product06, product01],

    roastLevel: "Dark",
    origin: "ترکیبی",
    process: "Blend",

    basePrice: 150000,
    discountPercent: 5,
    finalPrice: 142500,

    stock: 55,
    inStock: true,

    rating: 4.4,
    reviewCount: 45,

    flavorNotes: ["شکلات تلخ", "ادویه"],

    acidity: "پایین",
    bitterness: "بالا",
    body: "سنگین",

    description: "اسپرسو ایتالیایی با کرمای غلیظ و طعمی کلاسیک.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,
    isActive: true,
  },

  {
    id: 6,
    name: "قهوه ترک اصیل",
    slug: "turkish-coffee",
    category: "turkish",

    images: [product06, product01, product02],

    roastLevel: "Dark",
    origin: "ترکیبی",
    process: "Blend",

    basePrice: 130000,
    discountPercent: 0,
    finalPrice: 130000,

    stock: 40,
    inStock: true,

    rating: 4.7,
    reviewCount: 29,

    flavorNotes: ["هل", "ادویه شیرین"],

    acidity: "پایین",
    bitterness: "متوسط",
    body: "بسیار سنگین",

    description: "قهوه ترک سنتی با رایحه هل و آسیاب بسیار ریز.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: false,
    isActive: true,
  },
];

export default products;

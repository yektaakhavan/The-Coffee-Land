import product01 from "../assets/images/product/01.jpg";
import product02 from "../assets/images/product/02.jpg";
import product03 from "../assets/images/product/03.jpg";
import product04 from "../assets/images/product/04.jpg";
import product05 from "../assets/images/product/05.jpg";
import product06 from "../assets/images/product/06.jpg";

const products = [
  {
    id: 1,
    sku: "CF-0001",

    name: "قهوه عربیکا اتیوپی",
    slug: "ethiopia-yirgacheffe",

    category: {
      id: 1,
      title: "تک خاستگاه",
      slug: "single-origin",
    },

    images: [product01, product02, product03],

    roastLevel: "Light",
    origin: "اتیوپی",
    process: "شسته",

    basePrice: 180000,
    discountPercent: 10,

    inventory: {
      stock: 45,
      reserved: 2,
      sold: 138,
    },

    status: "active",

    rating: 4.8,
    reviewCount: 24,

    flavorNotes: ["بلوبری", "شکلات تلخ", "گل یاس"],

    acidity: "بالا",
    bitterness: "متوسط",
    body: "سبک تا متوسط",

    description: "قهوه‌ای خوش‌عطر با اسیدیته بالا و نت‌های میوه‌ای و گلی.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,

    createdAt: "2026-01-15",
    updatedAt: "2026-07-20",
  },

  {
    id: 2,
    sku: "CF-0002",

    name: "قهوه کلمبیا سوپریمو",
    slug: "colombia-supremo",

    category: {
      id: 1,
      title: "تک خاستگاه",
      slug: "single-origin",
    },

    images: [product02, product03, product04],

    roastLevel: "Medium",
    origin: "کلمبیا",
    process: "شسته",

    basePrice: 160000,
    discountPercent: 0,

    inventory: {
      stock: 67,
      reserved: 5,
      sold: 201,
    },

    status: "active",

    rating: 4.6,
    reviewCount: 31,

    flavorNotes: ["کارامل", "آجیل", "سیب قرمز"],

    acidity: "متوسط",
    bitterness: "متوسط",
    body: "متوسط",

    description: "طعمی متعادل با شیرینی کاراملی و رایحه دلچسب.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,

    createdAt: "2026-01-18",
    updatedAt: "2026-07-20",
  },

  {
    id: 3,
    sku: "CF-0003",

    name: "قهوه برزیل سانتوس",
    slug: "brazil-santos",

    category: {
      id: 1,
      title: "تک خاستگاه",
      slug: "single-origin",
    },

    images: [product03, product04, product05],

    roastLevel: "Medium Dark",
    origin: "برزیل",
    process: "طبیعی",

    basePrice: 140000,
    discountPercent: 15,

    inventory: {
      stock: 92,
      reserved: 6,
      sold: 320,
    },

    status: "active",

    rating: 4.5,
    reviewCount: 18,

    flavorNotes: ["شکلات", "فندق"],

    acidity: "پایین",
    bitterness: "متوسط",
    body: "سنگین",

    description: "قهوه‌ای کلاسیک با بادی سنگین و طعم شکلاتی.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: false,

    createdAt: "2026-02-02",
    updatedAt: "2026-07-20",
  },

  {
    id: 4,
    sku: "CF-0004",

    name: "قهوه کنیا AA",
    slug: "kenya-aa",

    category: {
      id: 1,
      title: "تک خاستگاه",
      slug: "single-origin",
    },

    images: [product04, product05, product06],

    roastLevel: "Light Medium",
    origin: "کنیا",
    process: "شسته",

    basePrice: 200000,
    discountPercent: 0,

    inventory: {
      stock: 0,
      reserved: 0,
      sold: 124,
    },

    status: "out-of-stock",

    rating: 4.9,
    reviewCount: 12,

    flavorNotes: ["مرکبات", "انگور سیاه"],

    acidity: "بالا",
    bitterness: "پایین",
    body: "متوسط",

    description: "اسیدیته روشن، رایحه مرکبات و طعمی پیچیده.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,

    createdAt: "2026-02-15",
    updatedAt: "2026-07-20",
  },

  {
    id: 5,
    sku: "CF-0005",

    name: "اسپرسو بلند ایتالیایی",
    slug: "italian-espresso",

    category: {
      id: 2,
      title: "بلند اسپرسو",
      slug: "espresso-blend",
    },

    images: [product05, product06, product01],

    roastLevel: "Dark",
    origin: "ترکیبی",
    process: "Blend",

    basePrice: 150000,
    discountPercent: 5,

    inventory: {
      stock: 55,
      reserved: 4,
      sold: 251,
    },

    status: "active",

    rating: 4.4,
    reviewCount: 45,

    flavorNotes: ["شکلات تلخ", "ادویه"],

    acidity: "پایین",
    bitterness: "بالا",
    body: "سنگین",

    description: "اسپرسو ایتالیایی با کرمای غلیظ و طعمی کلاسیک.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: true,

    createdAt: "2026-03-01",
    updatedAt: "2026-07-20",
  },

  {
    id: 6,
    sku: "CF-0006",

    name: "قهوه ترک اصیل",
    slug: "turkish-coffee",

    category: {
      id: 3,
      title: "قهوه ترک",
      slug: "turkish",
    },

    images: [product06, product01, product02],

    roastLevel: "Dark",
    origin: "ترکیبی",
    process: "Blend",

    basePrice: 130000,
    discountPercent: 0,

    inventory: {
      stock: 40,
      reserved: 3,
      sold: 172,
    },

    status: "active",

    rating: 4.7,
    reviewCount: 29,

    flavorNotes: ["هل", "ادویه شیرین"],

    acidity: "پایین",
    bitterness: "متوسط",
    body: "بسیار سنگین",

    description: "قهوه ترک سنتی با رایحه هل و آسیاب بسیار ریز.",

    sizes: ["250g", "500g", "1kg"],

    isFeatured: false,

    createdAt: "2026-03-10",
    updatedAt: "2026-07-20",
  },
];

export default products;

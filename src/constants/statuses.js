const statuses = {
  // Product Status
  active: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  draft: {
    label: "پیش‌نویس",
    className: "bg-gray-100 text-gray-700",
  },

  "out-of-stock": {
    label: "ناموجود",
    className: "bg-red-100 text-red-700",
  },

  inactive: {
    label: "غیرفعال",
    className: "bg-red-100 text-red-700",
  },


  // Order Status
  pending: {
    label: "در انتظار",
    className: "bg-yellow-100 text-yellow-700",
  },

  completed: {
    label: "تکمیل شده",
    className: "bg-emerald-100 text-emerald-700",
  },

  shipped: {
    label: "ارسال شده",
    className: "bg-sky-100 text-sky-700",
  },

  cancelled: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700",
  },
};

export default statuses;
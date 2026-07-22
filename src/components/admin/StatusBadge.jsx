function StatusBadge({ status }) {
  const statusStyles = {
    active: {
      label: "فعال",
      className: "bg-green-100 text-green-700",
    },
    inactive: {
      label: "غیرفعال",
      className: "bg-red-100 text-red-700",
    },
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
  };

  const current = statusStyles[status] || {
    label: status,
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${current.className}`}
    >
      {current.label}
    </span>
  );
}

export default StatusBadge;

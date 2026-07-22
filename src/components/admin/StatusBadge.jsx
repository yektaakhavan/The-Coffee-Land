import statuses from "../../constants/statuses";

function StatusBadge({ status }) {
  const current = statuses[status] || {
    label: status,
    className: "bg-stone-100 text-stone-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        whitespace-nowrap
        ${current.className}
      `}
    >
      {current.label}
    </span>
  );
}

export default StatusBadge;

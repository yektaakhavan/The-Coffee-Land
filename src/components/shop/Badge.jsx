function Badge({ children, type = "default" }) {
  const styles = {
    discount: "bg-[#9c3d22] text-white text-s",
    featured: "bg-amber-600 text-white text-xs",
    stock: "bg-red-600 text-white text-s",
    flavor: "bg-amber-50 text-amber-800 text-xs",
    default: "bg-gray-300 text-black text-xs",
  };

  if (type === "discount") {
    return (
      <span
        className={` inline-flex items-center justify-center min-w-[34px] px-2 pt-1.5 pb-2.5 font-bold rounded-t-md rounded-tr-[3px] ${styles.discount}`}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 7px), 0 100%)",
        }}
      >
        {children}
      </span>
    );
  }

  return <span className={`px-2 py-1 rounded ${styles[type]}`}>{children}</span>;
}

export default Badge;

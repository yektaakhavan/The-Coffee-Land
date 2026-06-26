function Badge({ children, type = "default" }) {
  const styles = {
    discount: "bg-red-500 text-white",
    featured: "bg-amber-600 text-white",
    stock: "bg-orange-500 text-white",
    flavor: "bg-amber-50 text-amber-800", // نوع جدید
    default: "bg-gray-300 text-black",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${styles[type]}`}>
      {children}
    </span>
  );
}

export default Badge;

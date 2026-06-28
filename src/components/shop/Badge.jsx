function Badge({ children, type = "default" }) {
  const styles = {
    discount: "bg-orange-500 text-white text-s",
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

  return (
    <span className={`px-2 py-1 rounded ${styles[type]}`}>
      {children}
    </span>
  );
}

export default Badge;

// function Badge({ children, type = "default" }) {
//   const styles = {
//     discount:
//       "bg-red-500/90 text-white border border-red-400/40 shadow-sm",

//     featured:
//       "bg-gradient-to-r from-amber-500 to-orange-500 text-white border border-amber-300/40 shadow-sm",

//     stock:
//       "bg-orange-500/90 text-white border border-orange-300/40 shadow-sm",

//     flavor:
//       "bg-white/80 text-amber-900 border border-amber-100 backdrop-blur-md shadow-[0_4px_10px_rgba(245,158,11,0.08)] hover:shadow-[0_6px_14px_rgba(245,158,11,0.12)]",

//     default:
//       "bg-gray-100 text-gray-700 border border-gray-200",
//   };

//   return (
//     <span
//       className={`
//         inline-flex items-center
//         px-3 py-1.5
//         rounded-full
//         text-[11px]
//         font-medium
//         tracking-wide
//         transition duration-300
//         ${styles[type]}
//       `}
//     >
//       {children}
//     </span>
//   );
// }

// export default Badge;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdCategory,
  MdShoppingCart,
  MdPeople,
  MdReviews,
  MdDiscount,
  MdSettings,
} from "react-icons/md";
import { GrArticle } from "react-icons/gr";

function AdminSidebar() {
  const menuItems = [
    {
      to: "/admin",
      label: "پیشخوان",
      icon: <MdDashboard className="text-sky-400 text-xl" />,
    },
    {
      to: "/admin/products",
      label: "محصولات",
      icon: <MdInventory className="text-green-400 text-xl" />,
    },
    {
      to: "/admin/categories",
      label: "دسته‌بندی‌ها",
      icon: <MdCategory className="text-yellow-400 text-xl" />,
    },
    {
      to: "/admin/orders",
      label: "سفارشات",
      icon: <MdShoppingCart className="text-orange-400 text-xl" />,
    },
    {
      to: "/admin/customers",
      label: "مشتریان",
      icon: <MdPeople className="text-pink-400 text-xl" />,
    },
    {
      to: "/admin/reviews",
      label: "نظرات",
      icon: <MdReviews className="text-amber-300 text-xl" />,
    },
    {
      to: "/admin/coupons",
      label: "تخفیف‌ها",
      icon: <MdDiscount className="text-emerald-400 text-xl" />,
    },
    {
      to: "/admin/blog",
      label: "بلاگ",
      icon: <GrArticle className="text-cyan-400 text-xl" />,
    },
    {
      to: "/admin/settings",
      label: "تنظیمات",
      icon: <MdSettings className="text-gray-300 text-xl" />,
    },
  ];
  return (
    <aside className="w-64 shrink-0 bg-purple-950 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-center">☕ پنل ادمین</h2>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            end      //برای اینکه پیشخوان رو به صورت اکتیو نداشته باشیم
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 py-2 px-3 rounded bg-purple-700"
                : "flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-800"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;

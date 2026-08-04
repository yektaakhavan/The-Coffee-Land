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
import { FaNewspaper } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

const menuItems = [
  { to: "/admin", label: "پیشخوان", icon: MdDashboard },
  { to: "/admin/products", label: "محصولات", icon: MdInventory },
  { to: "/admin/categories", label: "دسته‌بندی‌ها", icon: MdCategory },
  { to: "/admin/orders", label: "سفارشات", icon: MdShoppingCart },
  { to: "/admin/customers", label: "مشتریان", icon: MdPeople },
  { to: "/admin/reviews", label: "نظرات", icon: MdReviews },
  { to: "/admin/coupons", label: "تخفیف‌ها", icon: MdDiscount },
  { to: "/admin/blog", label: "مقالات", icon: FaNewspaper },
  { to: "/admin/settings", label: "تنظیمات", icon: MdSettings },
];

function AdminSidebar({ open = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 right-0
          z-50 md:z-auto
          w-64 shrink-0
          h-screen min-h-screen max-h-screen overflow-y-auto
          bg-amber-950 text-amber-50
          p-4 flex flex-col
          transition-transform duration-300
          md:translate-x-0
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-8 pt-2 pb-4 border-b border-amber-900/60">
          <div className="flex items-center gap-2 flex-1 justify-center">
            <span className="text-2xl">☕</span>
            <div className="text-center">
              <h2 className="text-base font-extrabold leading-tight">
                سرزمین قهوه
              </h2>
              <p className="text-[11px] text-amber-400 font-medium tracking-wide">
                پنل مدیریت
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="بستن منو"
            className="md:hidden text-amber-200 hover:text-white p-1"
          >
            <HiXMark className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                end={item.to === "/admin"}
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2.5 px-3.5 rounded-xl transition ${
                    isActive
                      ? "bg-amber-500 text-amber-950 font-bold"
                      : "text-amber-100/80 hover:bg-amber-900 hover:text-white"
                  }`
                }
              >
                <Icon className="text-lg" />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-amber-900/60 text-center">
          <a
            href="/"
            className="text-xs text-amber-400 hover:text-amber-200 transition"
          >
            ← بازگشت به فروشگاه
          </a>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;

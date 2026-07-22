import { Link } from "react-router-dom";
import { FaPlus, FaClipboardList, FaUsers, FaPenNib } from "react-icons/fa";

const actions = [
  {
    title: "افزودن محصول",
    icon: <FaPlus />,
    to: "/admin/products/add",
    color: "bg-amber-700",
  },
  {
    title: "مدیریت سفارش‌ها",
    icon: <FaClipboardList />,
    to: "/admin/orders",
    color: "bg-sky-600",
  },
  {
    title: "مدیریت مشتریان",
    icon: <FaUsers />,
    to: "/admin/customers",
    color: "bg-emerald-600",
  },
  {
    title: "نوشتن مقاله",
    icon: <FaPenNib />,
    to: "/admin/blog",
    color: "bg-purple-600",
  },
];

function QuickActions() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">دسترسی سریع</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {actions.map((action) => (
          <Link key={action.title} to={action.to} className="group">
            <div className="border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition">
              <div
                className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-5`}
              >
                {action.icon}
              </div>

              <h3 className="font-bold text-lg">{action.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;

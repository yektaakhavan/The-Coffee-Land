import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";

import DashboardCard from "./DashboardCard";

function DashboardStats() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
      <DashboardCard
        title="کل محصولات"
        value="126"
        icon={<FaBoxOpen />}
        color="bg-amber-700"
      />

      <DashboardCard
        title="کل مشتریان"
        value="842"
        icon={<FaUsers />}
        color="bg-sky-600"
      />

      <DashboardCard
        title="سفارش امروز"
        value="37"
        icon={<FaShoppingCart />}
        color="bg-emerald-600"
      />

      <DashboardCard
        title="فروش امروز"
        value="18.4M"
        icon={<FaMoneyBillWave />}
        color="bg-purple-600"
      />
    </div>
  );
}

export default DashboardStats;

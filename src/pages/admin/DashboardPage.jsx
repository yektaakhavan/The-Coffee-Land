import DashboardHeader from "../../components/admin/DashboardHeader";
import DashboardStats from "../../components/admin/DashboardStats";

import SalesChart from "../../components/admin/SalesChart";
import RecentOrders from "../../components/admin/RecentOrders";
import QuickActions from "../../components/admin/QuickActions";

function DashboardPage() {
  return (
    <section className="space-y-8">
      <DashboardHeader />

      <DashboardStats />

      <QuickActions />

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <RecentOrders />
      </div>
    </section>
  );
}

export default DashboardPage;

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import salesChart from "../../data/salesChart";

function SalesChart() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 h-[430px]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">نمودار فروش</h2>

          <p className="text-gray-500 text-sm mt-1">فروش ۷ ماه اخیر</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={salesChart}>
          <defs>
            <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b45309" stopOpacity={0.45} />

              <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="sales"
            stroke="#b45309"
            strokeWidth={3}
            fill="url(#sales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;

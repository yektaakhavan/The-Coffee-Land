import React from "react";

function DashboardCard({ title, value, icon, color = "bg-amber-700" }) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-black mt-3">{value}</h2>
        </div>

        <div
          className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;

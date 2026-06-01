import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

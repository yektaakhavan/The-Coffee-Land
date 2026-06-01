import React from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-700">پنل مدیریت</h2>

      <div className="flex items-center gap-10">
        <button className="flex items-center gap-2">
          <MdNotificationsActive className="text-amber-500 text-xl" />
          <span>اعلان جدید</span>
        </button>

        <button className="flex items-center gap-2">
          <FaUser className="text-purple-700 text-lg" />
          <span>ادمین</span>
        </button>

        <Link to="/sign-in" className="flex items-center gap-2 text-red-600">
          <IoLogOutOutline className="text-rose-500 text-xl" />
          <span>خروج</span>
        </Link>
      </div>
    </header>
  );
}

export default AdminHeader;

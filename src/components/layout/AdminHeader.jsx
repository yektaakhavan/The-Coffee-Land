import { useContext } from "react";
import { FaUserCircle, FaSignOutAlt, FaBell } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import { UserInfoContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminHeader({ onMenuClick = () => {} }) {
  const { logout, user } = useContext(UserInfoContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/sign-in");
  };

  return (
    <header className="bg-white border-b border-amber-100 shadow-sm px-4 md:px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          className="md:hidden text-stone-700 hover:text-amber-700 p-1 -mr-1"
        >
          <HiBars3 className="text-2xl" />
        </button>

        <h2 className="text-lg font-bold text-stone-800">پنل مدیریت</h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button
          type="button"
          className="hidden sm:flex items-center gap-2 text-stone-600 hover:text-amber-700 transition"
        >
          <FaBell className="text-amber-600 text-lg" />
          <span className="text-sm hidden lg:inline">اعلان جدید</span>
        </button>

        <div className="flex items-center gap-2 text-stone-700">
          <FaUserCircle className="text-amber-700 text-xl" />
          <span className="text-sm font-semibold hidden sm:inline">
            {user?.fullName}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm hidden sm:inline">خروج</span>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;

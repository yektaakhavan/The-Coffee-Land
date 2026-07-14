import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

function UserMenu({ user, isAdmin, logout }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
        <FaUserCircle className="text-2xl text-amber-300" />

        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold">{user.fullName}</span>

          <span className="text-xs text-amber-200">
            {isAdmin ? "مدیر سیستم" : "مشتری"}
          </span>
        </div>
      </div>

      {isAdmin && (
        <Link
          to="/admin"
          className="bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded-lg transition"
        >
          پنل مدیریت
        </Link>
      )}

      <button
        onClick={logout}
        className="flex items-center gap-2 text-red-300 hover:text-red-400 transition"
      >
        <IoLogOutOutline className="text-xl" />
        خروج
      </button>
    </div>
  );
}

export default UserMenu;

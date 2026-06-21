import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineLogin } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { CgMenuGridO } from "react-icons/cg";
import { menuItems } from "../../data/menuItems";

function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //Mobile Menu is Close

  return (
    <header className="bg-amber-900 text-white p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-amber-300">
          سرزمین قهوه☕
        </Link>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <HiXMark /> : <CgMenuGridO />}
          </button>

          <Link to="/login" className="text-2xl">
            <HiOutlineLogin />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-amber-300 font-semibold border-b-2 border-amber-300 pb-1"
                  : "hover:text-amber-300"
              }
            >
              {item.title}
            </NavLink>
          ))}

          <NavLink
            to="/auth/sign-in"
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-lg transition"
          >
            ورود / عضویت
            <HiOutlineLogin className="text-xl" />
          </NavLink>
        </nav>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-amber-900">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-amber-300 font-semibold border-b-2 border-amber-300 pb-1"
                  : "hover:text-amber-300"
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default PublicHeader;

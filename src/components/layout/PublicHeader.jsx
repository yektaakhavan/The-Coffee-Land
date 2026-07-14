import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { HiOutlineLogin } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { CgMenuGridO } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";

import { menuItems } from "../../data/menuItems";

import { UserInfoContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

import UserMenu from "./UserMenu";

function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } =
    useContext(UserInfoContext);

  const { totalItems } = useContext(CartContext);

  return (
    <header className="bg-amber-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-amber-300 transition"
        >
          ☕ سرزمین قهوه
        </Link>

        {/* ================= Mobile ================= */}

        <div className="md:hidden flex items-center gap-5">
          {/* Cart */}
          <Link to="/cart" className="relative hover:text-amber-300 transition">
            <FaShoppingCart className="text-2xl" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -left-2 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Login */}
          {!isAuthenticated && (
            <Link
              to="/auth/sign-in"
              className="text-2xl hover:text-amber-300 transition"
            >
              <HiOutlineLogin />
            </Link>
          )}

          {/* Menu */}
          <button
            className="text-3xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <HiXMark /> : <CgMenuGridO />}
          </button>
        </div>

        {/* ================= Desktop ================= */}

        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-amber-300 font-semibold border-b-2 border-amber-300 pb-1"
                  : "hover:text-amber-300 transition"
              }
            >
              {item.title}
            </NavLink>
          ))}

          {/* Cart */}

          <Link to="/cart" className="relative hover:text-amber-300 transition">
            <FaShoppingCart className="text-2xl" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -left-2 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Login/User */}

          {!isAuthenticated ? (
            <NavLink
              to="/auth/sign-in"
              className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-xl transition"
            >
              <HiOutlineLogin className="text-xl" />
              ورود / عضویت
            </NavLink>
          ) : (
            <UserMenu user={user} isAdmin={isAdmin} logout={logout} />
          )}
        </nav>
      </div>

      {/* ================= Mobile Menu ================= */}

      {isMenuOpen && (
        <nav className="md:hidden bg-amber-900 border-t border-amber-800 px-6 py-5 flex flex-col gap-5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-amber-300 font-semibold"
                  : "hover:text-amber-300 transition"
              }
            >
              {item.title}
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <hr className="border-amber-700" />

              <UserMenu user={user} isAdmin={isAdmin} logout={logout} />
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default PublicHeader;

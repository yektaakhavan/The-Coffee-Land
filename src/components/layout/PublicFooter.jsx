import React from "react";
import { menuItems } from "../../data/menuItems";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import coffeeTime from "../../assets/images/product/coffee-time.webp";

function PublicFooter() {
  return (
    <>
      <footer className="bg-amber-900 text-white px-20 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
          <div>
            <h2 className="text-xl font-bold mb-4">دسته بندی سریع</h2>
            <ul className="ps-8">
              {menuItems
                .filter((item) => item.showInFooter)
                .map((item) => (
                  <li
                    className="mb-1.5 list-disc ps-2 hover:text-amber-300"
                    key={item.path}
                  >
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">شبکه های اجتماعی</h2>
            <div className="flex justify-between bg-amber-700 rounded-2xl py-2 px-4 w-60">
              <a
                href="https://github.com"
                aria-label="گیت‌هاب"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl hover:text-amber-200 transition" />
              </a>
              <a
                href="https://linkedin.com/in/yekta-akhavan"
                aria-label="لینکدین"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl hover:text-amber-200 transition" />
              </a>
              <a
                href="https://t.me"
                aria-label="تلگرام"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="text-2xl hover:text-amber-200 transition" />
              </a>
              <a
                href="https://watsapp"
                aria-label="واتساپ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-2xl hover:text-amber-200 transition" />
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              className="w-28 h-28 object-contain"
              src={coffeeTime}
              alt=""
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default PublicFooter;

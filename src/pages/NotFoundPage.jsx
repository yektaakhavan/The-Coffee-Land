import { Link } from "react-router-dom";
import { FaHome, FaHeadset } from "react-icons/fa";

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-amber-950 px-6 py-24 text-center">
      <div>
        <p className="text-base font-bold text-amber-400">۴۰۴</p>

        <h1 className="mt-4 text-4xl sm:text-6xl font-black text-amber-50">
          این صفحه پیدا نشد
        </h1>

        <p className="mt-6 text-lg text-amber-200/70 max-w-md mx-auto">
          به نظر می‌رسد صفحه‌ای که دنبالش می‌گردید حذف شده یا هرگز وجود
          نداشته است.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-bold text-amber-950 transition"
          >
            <FaHome />
            بازگشت به خانه
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2 rounded-2xl border border-amber-200/30 px-6 py-3 text-sm font-bold text-amber-100 hover:bg-white/10 transition"
          >
            <FaHeadset />
            تماس با پشتیبانی
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;

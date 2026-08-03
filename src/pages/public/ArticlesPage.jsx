import { useMemo } from "react";
import { HiOutlineCalendar, HiOutlineUser } from "react-icons/hi2";

import blogPosts from "../../data/blogPosts";
import Reveal from "../../components/ui/Reveal";

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function ArticlesPage() {
  const publishedPosts = useMemo(
    () => blogPosts.filter((post) => post.status === "published"),
    [],
  );

  return (
    <div className="bg-[#F5EFE2] min-h-screen">
      <Reveal>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-50 text-amber-700 text-sm px-4 py-1.5 rounded-full mb-6 border border-amber-100">
            مقالات تخصصی
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-4">
            مقالات سرزمین قهوه
          </h1>

          <p className="text-stone-500 max-w-xl mx-auto leading-8">
            نوشته‌های تخصصی‌تر درباره دنیای قهوه، از دانه تا فنجان.
          </p>
        </div>

        {publishedPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center text-stone-500">
            در حال حاضر مقاله‌ای منتشر نشده است
          </div>
        ) : (
          <div className="divide-y divide-amber-100 bg-white rounded-3xl border border-amber-50 shadow-sm">
            {publishedPosts.map((post) => (
              <article key={post.id} className="p-7 md:p-9 hover:bg-amber-50/40 transition">
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-stone-800 mt-4 mb-3">
                  {post.title}
                </h2>

                <p className="text-stone-600 leading-8 mb-5">
                  {post.content}
                </p>

                <div className="flex items-center gap-5 text-xs text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <HiOutlineUser />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiOutlineCalendar />
                    {formatDate(post.date)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      </Reveal>
    </div>
  );
}

export default ArticlesPage;

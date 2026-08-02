import { useMemo, useState } from "react";
import { HiOutlineCalendar, HiOutlineUser, HiChevronDown } from "react-icons/hi2";

import blogPosts from "../../data/blogPosts";

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

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openPostId, setOpenPostId] = useState(null);

  const publishedPosts = useMemo(
    () => blogPosts.filter((post) => post.status === "published"),
    [],
  );

  const categories = useMemo(() => {
    const unique = [...new Set(publishedPosts.map((post) => post.category))];
    return unique;
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return publishedPosts;
    return publishedPosts.filter((post) => post.category === activeCategory);
  }, [publishedPosts, activeCategory]);

  return (
    <div className="bg-[#FFFBEB] min-h-screen">
      {/* Hero */}
      <section className="bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <span className="inline-block bg-amber-700/60 text-amber-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-amber-500/40">
            بلاگ سرزمین قهوه
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            دانستنی‌ها و آموزش‌های دنیای قهوه
          </h1>

          <p className="text-amber-100/90 max-w-xl mx-auto leading-8">
            از انتخاب دانه تا بهترین روش‌های دم‌آوری؛ هر آنچه برای یک فنجان
            بهتر باید بدانید.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeCategory === "all"
                ? "bg-amber-800 text-white"
                : "bg-white text-stone-600 border border-amber-100 hover:bg-amber-50"
            }`}
          >
            همه مطالب
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-amber-800 text-white"
                  : "bg-white text-stone-600 border border-amber-100 hover:bg-amber-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center text-stone-500">
            مطلبی در این دسته یافت نشد
          </div>
        ) : (
          <div className="space-y-5">
            {filteredPosts.map((post) => {
              const isOpen = openPostId === post.id;

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-amber-50 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenPostId(isOpen ? null : post.id)}
                    className="w-full text-right p-6 md:p-8"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                          {post.category}
                        </span>

                        <h2 className="text-xl md:text-2xl font-bold text-stone-800 mt-4 mb-3">
                          {post.title}
                        </h2>

                        <p className="text-stone-500 leading-7">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-5 text-xs text-stone-400 mt-5">
                          <span className="flex items-center gap-1.5">
                            <HiOutlineUser />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <HiOutlineCalendar />
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>

                      <HiChevronDown
                        className={`text-2xl text-amber-800 shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 md:px-8 pb-8 -mt-2">
                      <div className="h-px bg-amber-50 mb-6"></div>
                      <p className="text-stone-600 leading-8">
                        {post.content}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default BlogPage;

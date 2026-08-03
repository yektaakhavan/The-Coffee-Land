import { Link, useParams } from "react-router-dom";
import { HiOutlineCalendar, HiOutlineUser, HiArrowLeft } from "react-icons/hi2";

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

function ArticleDetailPage() {
  const { slug } = useParams();

  const post = blogPosts.find(
    (item) => item.slug === slug && item.status === "published",
  );

  if (!post) {
    return (
      <div className="bg-[#F5EFE2] min-h-screen flex items-center justify-center px-6 py-24 text-center">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-800 mb-4">
            مقاله‌ای پیدا نشد
          </h1>

          <p className="text-stone-500 mb-8">
            ممکن است این مقاله حذف شده یا هنوز منتشر نشده باشد.
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-2xl transition"
          >
            بازگشت به بلاگ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EFE2] min-h-screen">
      <section className="bg-amber-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-amber-800/60 border border-amber-600/50 text-amber-200 text-sm font-medium">
            {post.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-amber-100/80 text-sm">
            <span className="flex items-center gap-2">
              <HiOutlineUser />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <HiOutlineCalendar />
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </section>

      <Reveal>
      <article className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-3xl border border-amber-50 shadow-sm p-8 md:p-10">
          <p className="text-stone-600 leading-9 text-lg">{post.content}</p>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-amber-800 font-bold hover:text-amber-600 transition"
          >
            <HiArrowLeft />
            بازگشت به همه مقالات
          </Link>
        </div>
      </article>
      </Reveal>
    </div>
  );
}

export default ArticleDetailPage;

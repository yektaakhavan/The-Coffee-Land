import { useState } from "react";

import blogPostsData from "../../data/blogPosts";

import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import TableActions from "../../components/admin/TableActions";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmModal from "../../components/ui/ConfirmModal";

const emptyPost = {
  title: "",
  category: "",
  author: "Yekta",
  status: "draft",
  excerpt: "",
  content: "",
};

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

function ArticlePostPage() {
  const [posts, setPosts] = useState(blogPostsData);

  const [postToDelete, setPostToDelete] = useState(null);

  // null = closed, "create" = new post, a post object = editing that post
  const [formTarget, setFormTarget] = useState(null);

  const [form, setForm] = useState(emptyPost);

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const openCreate = () => {
    setForm(emptyPost);
    setFormTarget("create");
  };

  const openEdit = (post) => {
    setForm({
      title: post.title,
      category: post.category,
      author: post.author,
      status: post.status,
      excerpt: post.excerpt,
      content: post.content,
    });
    setFormTarget(post);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formTarget === "create") {
      setPosts((prev) => [
        ...prev,
        {
          id: Date.now(),
          slug: slugify(form.title),
          date: new Date().toISOString().slice(0, 10),
          ...form,
        },
      ]);
    } else {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === formTarget.id ? { ...post, ...form } : post,
        ),
      );
    }

    setFormTarget(null);
  };

  const columns = [
    { key: "title", label: "عنوان مقاله" },
    { key: "category", label: "دسته‌بندی" },
    { key: "author", label: "نویسنده" },
    { key: "status", label: "وضعیت" },
    { key: "date", label: "تاریخ" },
    { key: "actions", label: "عملیات" },
  ];

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <TableHeader title="مدیریت مقالات" />

        <button
          onClick={openCreate}
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-xl transition"
        >
          افزودن مقاله
        </button>
      </div>

      <AdminTable
        columns={columns}
        data={posts}
        emptyMessage="مقاله‌ای وجود ندارد"
        renderCell={(key, post) => {
          switch (key) {
            case "status":
              return (
                <StatusBadge
                  status={post.status === "published" ? "active" : "draft"}
                />
              );

            case "actions":
              return (
                <TableActions
                  viewLink={`/articles/${post.slug}`}
                  onEdit={() => openEdit(post)}
                  onDelete={() => setPostToDelete(post)}
                />
              );

            default:
              return post[key];
          }
        }}
      />

      {formTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl my-8">
            <h2 className="text-xl font-bold text-stone-800 mb-6">
              {formTarget === "create" ? "افزودن مقاله جدید" : "ویرایش مقاله"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-stone-700">
                  عنوان
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold text-stone-700">
                    دسته‌بندی
                  </label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-stone-700">
                    وضعیت
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="draft">پیش‌نویس</option>
                    <option value="published">منتشر شده</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-stone-700">
                  خلاصه
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-stone-700">
                  متن مقاله
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-stone-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormTarget(null)}
                  className="rounded-xl border px-6 py-3 hover:bg-gray-100 transition"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 font-semibold transition"
                >
                  {formTarget === "create" ? "افزودن" : "ذخیره تغییرات"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!postToDelete}
        title="حذف مقاله"
        message={`آیا از حذف "${postToDelete?.title}" مطمئن هستید؟`}
        confirmText="حذف"
        cancelText="انصراف"
        onCancel={() => setPostToDelete(null)}
        onConfirm={() => {
          deletePost(postToDelete.id);
          setPostToDelete(null);
        }}
      />
    </section>
  );
}

export default ArticlePostPage;

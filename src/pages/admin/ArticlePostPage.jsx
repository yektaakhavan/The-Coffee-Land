import { useState } from "react";

import blogPostsData from "../../data/blogPosts";

import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import TableActions from "../../components/admin/TableActions";
import StatusBadge from "../../components/admin/StatusBadge";

function ArticlePostPage() {
  const [posts, setPosts] = useState(blogPostsData);

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const columns = [
    {
      key: "title",
      label: "عنوان مقاله",
    },

    {
      key: "category",
      label: "دسته‌بندی",
    },

    {
      key: "author",
      label: "نویسنده",
    },

    {
      key: "status",
      label: "وضعیت",
    },

    {
      key: "date",
      label: "تاریخ",
    },

    {
      key: "actions",
      label: "عملیات",
    },
  ];

  return (
    <section className="space-y-8">
      <div
        className="
        flex
        justify-between
        items-center
      "
      >
        <TableHeader title="مدیریت مقالات" />

        <button
          className="
            bg-amber-700
            text-white
            px-6
            py-3
            rounded-xl
          "
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
                  status={post.status === "published" ? "active" : "inactive"}
                />
              );

            case "actions":
              return <TableActions onDelete={() => deletePost(post.id)} />;

            default:
              return post[key];
          }
        }}
      />
    </section>
  );
}

export default ArticlePostPage;

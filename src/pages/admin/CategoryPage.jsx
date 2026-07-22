import { useMemo, useState } from "react";

import categories from "../../data/categories";

import SearchBox from "../../components/admin/SearchBox";
import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import TableActions from "../../components/admin/TableActions";

function CategoryPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const columns = [
    {
      key: "title",
      label: "نام دسته",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "count",
      label: "تعداد محصولات",
    },
    {
      key: "status",
      label: "وضعیت",
    },
    {
      key: "actions",
      label: "عملیات",
    },
  ];

  return (
    <section className="space-y-8">
      <TableHeader title="مدیریت دسته‌بندی‌ها">
        <button
          className="
            bg-amber-700
            hover:bg-amber-800
            text-white
            px-6
            py-3
            rounded-2xl
            transition
          "
        >
          افزودن دسته‌بندی
        </button>
      </TableHeader>

      <SearchBox
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجوی دسته‌بندی..."
      />

      <AdminTable
        columns={columns}
        data={filteredCategories}
        emptyMessage="دسته‌بندی‌ای یافت نشد."
        renderCell={(key, category) => {
          switch (key) {
            case "status":
              return <StatusBadge status={category.status} />;

            case "actions":
              return (
                <TableActions
                  editLink={`/admin/categories/edit/${category.id}`}
                  onDelete={() => console.log("Delete Category:", category.id)}
                />
              );

            default:
              return category[key];
          }
        }}
      />
    </section>
  );
}

export default CategoryPage;

import { useMemo, useState } from "react";

import { useCategories } from "../../context/CategoryContext";

import SearchBox from "../../components/admin/SearchBox";
import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import TableActions from "../../components/admin/TableActions";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CategoryForm from "../../components/admin/category/CategoryForm";

function CategoryPage() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategories();

  const [search, setSearch] = useState("");

  // null => closed, "create" => add modal, a category object => edit modal
  const [formTarget, setFormTarget] = useState(null);

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      (category.title || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const handleCreate = (values) => {
    addCategory({
      id: Date.now(),
      count: 0,
      ...values,
    });

    setFormTarget(null);
  };

  const handleUpdate = (values) => {
    updateCategory(formTarget.id, values);
    setFormTarget(null);
  };

  const columns = [
    { key: "title", label: "نام دسته" },
    { key: "slug", label: "Slug" },
    { key: "count", label: "تعداد محصولات" },
    { key: "status", label: "وضعیت" },
    { key: "actions", label: "عملیات" },
  ];

  return (
    <section className="space-y-8">
      <TableHeader title="مدیریت دسته‌بندی‌ها">
        <button
          onClick={() => setFormTarget("create")}
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
                  onEdit={() => setFormTarget(category)}
                  onDelete={() => setCategoryToDelete(category)}
                />
              );

            default:
              return category[key];
          }
        }}
      />

      {/* Create / Edit modal */}
      {formTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-stone-800 mb-6">
              {formTarget === "create"
                ? "افزودن دسته‌بندی جدید"
                : `ویرایش «${formTarget.title}»`}
            </h2>

            <CategoryForm
              initialValues={formTarget === "create" ? null : formTarget}
              submitLabel={formTarget === "create" ? "افزودن" : "ذخیره تغییرات"}
              onCancel={() => setFormTarget(null)}
              onSubmit={formTarget === "create" ? handleCreate : handleUpdate}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!categoryToDelete}
        title="حذف دسته‌بندی"
        message={`آیا از حذف "${categoryToDelete?.title}" مطمئن هستید؟`}
        confirmText="حذف"
        cancelText="انصراف"
        onCancel={() => setCategoryToDelete(null)}
        onConfirm={() => {
          deleteCategory(categoryToDelete.id);
          setCategoryToDelete(null);
        }}
      />
    </section>
  );
}

export default CategoryPage;

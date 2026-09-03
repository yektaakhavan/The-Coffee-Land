import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const apiCategories = await api.getCategories();
      setCategories(apiCategories);
    } catch (err) {
      setError(err.message || "خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addCategory(category) {
    await api.createCategory({ title: category.title, slug: category.slug });
    await refresh();
  }

  async function updateCategory(id, updatedCategory) {
    await api.updateCategory(id, updatedCategory);
    await refresh();
  }

  async function deleteCategory(id) {
    await api.deleteCategory(id);
    setCategories((prev) => prev.filter((item) => item.id !== id));
  }

  function getCategoryById(id) {
    return categories.find((item) => item.id === Number(id));
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        refresh,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}

import { createContext, useContext, useEffect, useState } from "react";
import categoriesData from "../data/categories";

const CategoryContext = createContext();

const STORAGE_KEY = "coffee-shop-categories";

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return categoriesData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  function addCategory(category) {
    setCategories((prev) => [...prev, category]);
  }

  function updateCategory(id, updatedCategory) {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedCategory,
            }
          : item,
      ),
    );
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  }

  function getCategoryById(id) {
    return categories.find((item) => item.id === Number(id));
  }

  function resetCategories() {
    setCategories(categoriesData);
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        resetCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}

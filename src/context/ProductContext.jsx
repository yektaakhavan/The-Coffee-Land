import { createContext, useContext, useEffect, useState } from "react";
import productsData from "../data/products";

const ProductContext = createContext();

const STORAGE_KEY = "coffee-shop-products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);

    if (savedProducts) {
      return JSON.parse(savedProducts);
    }

    return productsData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updatedProduct,
            }
          : product,
      ),
    );
  };

  const getProductById = (id) => {
    return products.find((item) => item.id === Number(id));
  };

  const getProductBySlug = (slug) => {
    return products.find((item) => item.slug === slug);
  };

  const resetProducts = () => {
    setProducts(productsData);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        getProductById,
        getProductBySlug,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}

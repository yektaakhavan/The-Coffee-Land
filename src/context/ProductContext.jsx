import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";

const ProductContext = createContext();

// The backend stores category as a numeric categoryId + a flat
// stock/reserved/sold, but the rest of the app expects the legacy
// shape: category as {id, title, slug} and inventory as a nested
// object. This adapter keeps every existing page working unchanged.
function toLegacyProduct(apiProduct, categoriesById) {
  const category = categoriesById.get(apiProduct.categoryId) || null;

  return {
    id: apiProduct.id,
    sku: apiProduct.sku,
    name: apiProduct.name,
    slug: apiProduct.slug,
    category: category
      ? { id: category.id, title: category.title, slug: category.slug }
      : { id: null, title: "بدون دسته‌بندی", slug: "" },
    images: apiProduct.images ?? [],
    roastLevel: apiProduct.roastLevel,
    origin: apiProduct.origin,
    process: apiProduct.process,
    basePrice: apiProduct.basePrice,
    discountPercent: apiProduct.discountPercent,
    inventory: apiProduct.inventory,
    status: apiProduct.status,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviewCount,
    // Not modeled by the backend yet — kept so components that read
    // these fields don't crash; they'll just render as empty.
    flavorNotes: apiProduct.flavorNotes ?? [],
    sizes: apiProduct.sizes ?? ["250g"],
    description: apiProduct.description ?? "",
  };
}

// Reverse direction: legacy product shape (as built by ProductForm) ->
// what the API expects.
function toApiPayload(product, categoriesBySlug) {
  const categoryId =
    categoriesBySlug.get(product.category?.slug)?.id ?? product.categoryId ?? null;

  return {
    sku: product.sku,
    name: product.name,
    slug: product.slug,
    categoryId,
    images: product.images,
    roastLevel: product.roastLevel,
    origin: product.origin,
    process: product.process,
    basePrice: product.basePrice,
    discountPercent: product.discountPercent,
    inventory: product.inventory,
    status: product.status,
    rating: product.rating,
    reviewCount: product.reviewCount,
  };
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [apiProducts, apiCategories] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ]);
      const categoriesById = new Map(apiCategories.map((c) => [c.id, c]));
      setProducts(apiProducts.map((p) => toLegacyProduct(p, categoriesById)));
    } catch (err) {
      setError(err.message || "خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function getCategoriesBySlug() {
    const apiCategories = await api.getCategories();
    return new Map(apiCategories.map((c) => [c.slug, c]));
  }

  const addProduct = async (product) => {
    const categoriesBySlug = await getCategoriesBySlug();
    const payload = toApiPayload(product, categoriesBySlug);
    await api.createProduct(payload);
    await refresh();
  };

  const updateProduct = async (id, updatedProduct) => {
    const categoriesBySlug = await getCategoriesBySlug();
    const payload = toApiPayload(updatedProduct, categoriesBySlug);
    await api.updateProduct(id, payload);
    await refresh();
  };

  const deleteProduct = async (id) => {
    await api.deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find((item) => item.id === Number(id));
  };

  const getProductBySlug = (slug) => {
    return products.find((item) => item.slug === slug);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        deleteProduct,
        updateProduct,
        getProductById,
        getProductBySlug,
        refresh,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}

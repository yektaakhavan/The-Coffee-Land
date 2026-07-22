import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import SearchBox from "../../components/admin/SearchBox";
import TableHeader from "../../components/admin/TableHeader";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminTable from "../../components/admin/AdminTable";

import formatPrice from "../../utils/formatPrice.js";
import calculateFinalPrice from "../../utils/calculateFinalPrice.js";

import TableActions from "../../components/admin/TableActions";
import { useProducts } from "../../context/ProductContext.jsx";

function ProductsPage() {
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const columns = [
    { key: "image", label: "تصویر" },
    { key: "name", label: "نام محصول" },
    { key: "category", label: "دسته" },
    { key: "price", label: "قیمت" },
    { key: "stock", label: "موجودی" },
    { key: "status", label: "وضعیت" },
    { key: "actions", label: "عملیات" },
  ];

  return (
    <section className="space-y-8">
      <TableHeader title="مدیریت محصولات">
        <Link
          to="/admin/products/add"
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
          افزودن محصول
        </Link>
      </TableHeader>

      <SearchBox
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="جستجوی محصول..."
      />

      <AdminTable
        columns={columns}
        data={currentProducts}
        renderCell={(key, product) => {
          switch (key) {
            case "image":
              return (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
              );

            case "category":
              return product.category.title;

            case "price":
              return formatPrice(
                calculateFinalPrice(product.basePrice, product.discountPercent),
              );

            case "stock":
              return `${product.inventory.stock} عدد`;

            case "status":
              return <StatusBadge status={product.status} />;

            case "actions":
              return (
                <TableActions
                  viewLink={`/product/${product.slug}`}
                  editLink={`/admin/products/edit/${product.id}`}
                  onDelete={() => {
                    console.log("Delete", product.id);
                  }}
                />
              );

            default:
              return product[key];
          }
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default ProductsPage;

import { useContext, useMemo, useState } from "react";

import seedOrders from "../../data/orders";
import { OrderContext } from "../../context/OrderContext";

import SearchBox from "../../components/admin/SearchBox";
import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";
import TableActions from "../../components/admin/TableActions";
import ConfirmModal from "../../components/ui/ConfirmModal";

import formatPrice from "../../utils/formatPrice";
import normalizeOrder from "../../utils/normalizeOrder";

function OrdersPage() {
  const { orders: checkoutOrders, deleteOrder } = useContext(OrderContext);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [orderToDelete, setOrderToDelete] = useState(null);

  const ITEMS_PER_PAGE = 6;

  // Real orders placed through checkout show up first, seed/demo data fills the rest
  const allOrders = useMemo(
    () => [...checkoutOrders, ...seedOrders].map(normalizeOrder),
    [checkoutOrders],
  );

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) =>
      (order.customerName || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [allOrders, search]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = () => {
    // Only real (checkout) orders can actually be removed — demo/seed
    // rows are static sample data with no backing store.
    if (orderToDelete.source === "checkout") {
      deleteOrder(orderToDelete.id);
    }

    setOrderToDelete(null);
  };

  const columns = [
    { key: "orderNumber", label: "شماره سفارش" },
    { key: "customerName", label: "مشتری" },
    { key: "date", label: "تاریخ" },
    { key: "total", label: "مبلغ" },
    { key: "status", label: "وضعیت" },
    { key: "actions", label: "عملیات" },
  ];

  return (
    <section className="space-y-8">
      <TableHeader title="مدیریت سفارش‌ها" />

      <SearchBox
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="جستجوی مشتری..."
      />

      <AdminTable
        columns={columns}
        data={currentOrders}
        emptyMessage="سفارشی یافت نشد."
        renderCell={(key, order) => {
          switch (key) {
            case "total":
              return formatPrice(order.total);

            case "status":
              return <StatusBadge status={order.status} />;

            case "actions":
              return (
                <TableActions
                  viewLink={`/admin/order-detail/${order.id}`}
                  onDelete={() => setOrderToDelete(order)}
                />
              );

            default:
              return order[key];
          }
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmModal
        isOpen={!!orderToDelete}
        title="حذف سفارش"
        message={`آیا از حذف سفارش "${orderToDelete?.orderNumber}" مطمئن هستید؟`}
        confirmText="حذف"
        cancelText="انصراف"
        onCancel={() => setOrderToDelete(null)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export default OrdersPage;

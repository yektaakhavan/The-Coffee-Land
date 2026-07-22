import { useMemo, useState } from "react";

import orders from "../../data/orders";

import SearchBox from "../../components/admin/SearchBox";
import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";
import TableActions from "../../components/admin/TableActions";

import formatPrice from "../../utils/formatPrice";

function OrdersPage() {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const columns = [
    {
      key: "id",
      label: "شماره سفارش",
    },
    {
      key: "customer",
      label: "مشتری",
    },
    {
      key: "date",
      label: "تاریخ",
    },
    {
      key: "total",
      label: "مبلغ",
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
                  onDelete={() => console.log("Delete Order:", order.id)}
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
    </section>
  );
}

export default OrdersPage;

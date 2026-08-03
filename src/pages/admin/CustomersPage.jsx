import { useMemo, useState } from "react";

import customersData from "../../data/customers";

import SearchBox from "../../components/admin/SearchBox";
import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";
import TableActions from "../../components/admin/TableActions";
import ConfirmModal from "../../components/ui/ConfirmModal";

function CustomersPage() {
  const [customers, setCustomers] = useState(customersData);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [customerToDelete, setCustomerToDelete] = useState(null);

  const ITEMS_PER_PAGE = 6;

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      (customer.name || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [customers, search]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const columns = [
    {
      key: "name",
      label: "نام مشتری",
    },

    {
      key: "email",
      label: "ایمیل",
    },

    {
      key: "phone",
      label: "شماره تماس",
    },

    {
      key: "ordersCount",
      label: "تعداد سفارش",
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
      <TableHeader title="مدیریت مشتریان" />

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
        data={currentCustomers}
        emptyMessage="مشتری‌ای یافت نشد."
        renderCell={(key, customer) => {
          switch (key) {
            case "status":
              return <StatusBadge status={customer.status} />;

            case "actions":
              return (
                <TableActions
                  viewLink={`/admin/customer-profile/${customer.id}`}
                  onDelete={() => setCustomerToDelete(customer)}
                />
              );

            default:
              return customer[key];
          }
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmModal
        isOpen={!!customerToDelete}
        title="حذف مشتری"
        message={`آیا از حذف "${customerToDelete?.name}" مطمئن هستید؟`}
        confirmText="حذف"
        cancelText="انصراف"
        onCancel={() => setCustomerToDelete(null)}
        onConfirm={() => {
          setCustomers((prev) =>
            prev.filter((customer) => customer.id !== customerToDelete.id),
          );
          setCustomerToDelete(null);
        }}
      />
    </section>
  );
}

export default CustomersPage;

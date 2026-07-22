import { useState } from "react";

import couponsData from "../../data/coupons";

import StatusBadge from "../../components/admin/StatusBadge";
import TableHeader from "../../components/admin/TableHeader";
import AdminTable from "../../components/admin/AdminTable";
import TableActions from "../../components/admin/TableActions";

function CouponsPage() {
  const [coupons, setCoupons] = useState(couponsData);

  const [form, setForm] = useState({
    code: "",

    discount: "",

    expireDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const addCoupon = (e) => {
    e.preventDefault();

    const newCoupon = {
      id: Date.now(),

      code: form.code,

      discount: Number(form.discount),

      type: "percent",

      expireDate: form.expireDate,

      status: "active",
    };

    setCoupons((prev) => [...prev, newCoupon]);

    setForm({
      code: "",

      discount: "",

      expireDate: "",
    });
  };

  const deleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
  };

  const columns = [
    {
      key: "code",
      label: "کد تخفیف",
    },

    {
      key: "discount",
      label: "درصد",
    },

    {
      key: "expireDate",
      label: "تاریخ انقضا",
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
      <TableHeader title="مدیریت کدهای تخفیف" />

      {/* Add Coupon */}

      <form
        onSubmit={addCoupon}
        className="
          bg-white
          rounded-3xl
          shadow-lg
          p-6
          grid
          md:grid-cols-4
          gap-4
        "
      >
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="کد تخفیف"
          className="
            border
            rounded-xl
            p-3
          "
          required
        />

        <input
          name="discount"
          type="number"
          value={form.discount}
          onChange={handleChange}
          placeholder="درصد تخفیف"
          className="
            border
            rounded-xl
            p-3
          "
          required
        />

        <input
          name="expireDate"
          type="date"
          value={form.expireDate}
          onChange={handleChange}
          className="
            border
            rounded-xl
            p-3
          "
          required
        />

        <button
          type="submit"
          className="
            bg-amber-700
            hover:bg-amber-800
            text-white
            rounded-xl
            font-bold
          "
        >
          افزودن کوپن
        </button>
      </form>

      {/* Table */}

      <AdminTable
        columns={columns}
        data={coupons}
        emptyMessage="کدی وجود ندارد"
        renderCell={(key, coupon) => {
          switch (key) {
            case "discount":
              return `${coupon.discount}%`;

            case "status":
              return <StatusBadge status={coupon.status} />;

            case "actions":
              return <TableActions onDelete={() => deleteCoupon(coupon.id)} />;

            default:
              return coupon[key];
          }
        }}
      />
    </section>
  );
}

export default CouponsPage;

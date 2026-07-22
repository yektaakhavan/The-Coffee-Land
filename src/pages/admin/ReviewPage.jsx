import { useState } from "react";

import reviewsData from "../../data/reviews";

import StatusBadge from "../../components/admin/StatusBadge";
import TableActions from "../../components/admin/TableActions";
import TableHeader from "../../components/admin/TableHeader";
import SearchBox from "../../components/admin/SearchBox";
import AdminTable from "../../components/admin/AdminTable";

function ReviewPage() {
  const [reviews, setReviews] = useState(reviewsData);

  const [search, setSearch] = useState("");

  const filteredReviews = reviews.filter((review) => {
    return (
      review.user.toLowerCase().includes(search.toLowerCase()) ||
      review.product.toLowerCase().includes(search.toLowerCase())
    );
  });

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  const changeStatus = (id, status) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              status,
            }
          : review,
      ),
    );
  };

  const columns = [
    {
      key: "user",
      label: "کاربر",
    },

    {
      key: "product",
      label: "محصول",
    },

    {
      key: "rating",
      label: "امتیاز",
    },

    {
      key: "comment",
      label: "نظر",
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
      <TableHeader title="مدیریت نظرات" />

      <SearchBox
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجوی نظر یا محصول..."
      />

      <AdminTable
        columns={columns}
        data={filteredReviews}
        emptyMessage="نظری وجود ندارد"
        renderCell={(key, review) => {
          switch (key) {
            case "rating":
              return <span>⭐ {review.rating}</span>;

            case "comment":
              return (
                <p
                  className="
                  max-w-xs
                  truncate
                "
                >
                  {review.comment}
                </p>
              );

            case "status":
              return (
                <StatusBadge
                  status={
                    review.status === "approved"
                      ? "active"
                      : review.status === "pending"
                        ? "pending"
                        : "inactive"
                  }
                />
              );

            case "actions":
              return (
                <div className="flex gap-2">
                  {review.status !== "approved" && (
                    <button
                      onClick={() => changeStatus(review.id, "approved")}
                      className="
                        px-3
                        py-2
                        rounded-lg
                        bg-green-100
                        text-green-700
                        text-sm
                      "
                    >
                      تایید
                    </button>
                  )}

                  <TableActions onDelete={() => deleteReview(review.id)} />
                </div>
              );

            default:
              return review[key];
          }
        }}
      />
    </section>
  );
}

export default ReviewPage;

const orders = [
  {
    id: "ORD-1001",

    customer: "علی رضایی",

    date: "2026-06-10",

    total: 320000,

    status: "pending",

    items: [
      {
        id: 1,
        name: "قهوه عربیکا اتیوپی",
        quantity: 2,
        price: 180000,
      },
    ],
  },

  {
    id: "ORD-1002",

    customer: "نگار احمدی",

    date: "2026-06-11",

    total: 540000,

    status: "completed",

    items: [
      {
        id: 2,
        name: "قهوه کلمبیا سوپریمو",
        quantity: 3,
        price: 180000,
      },
    ],
  },

  {
    id: "ORD-1003",

    customer: "محمد عباسی",

    date: "2026-06-12",

    total: 180000,

    status: "shipped",

    items: [
      {
        id: 3,
        name: "قهوه برزیل سانتوس",
        quantity: 1,
        price: 180000,
      },
    ],
  },
];

export default orders;

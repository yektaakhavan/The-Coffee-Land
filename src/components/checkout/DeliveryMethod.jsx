import { FaTruck, FaMotorcycle, FaStore } from "react-icons/fa";

function DeliveryMethod({ selected, setSelected }) {
  const methods = [
    {
      id: "post",
      title: "پست پیشتاز",
      time: "۲ تا ۴ روز کاری",
      price: 60000,
      icon: <FaTruck />,
    },

    {
      id: "express",
      title: "ارسال فوری",
      time: "امروز",
      price: 90000,
      icon: <FaMotorcycle />,
    },

    {
      id: "pickup",
      title: "تحویل حضوری",
      time: "رایگان",
      price: 0,
      icon: <FaStore />,
    },
  ];

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      mt-8
    "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
      "
      >
        روش ارسال
      </h2>

      <div className="space-y-4">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`
                flex
                items-center
                justify-between
                p-5
                rounded-2xl
                border-2
                cursor-pointer
                transition

                ${
                  selected === method.id
                    ? "border-amber-700 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }

              `}
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <input
                type="radio"
                name="delivery"
                value={method.id}
                checked={selected === method.id}
                onChange={() => setSelected(method.id)}
              />

              <div
                className="
                  text-2xl
                  text-amber-700
                "
              >
                {method.icon}
              </div>

              <div>
                <h3
                  className="
                    font-bold
                  "
                >
                  {method.title}
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  {method.time}
                </p>
              </div>
            </div>

            <div
              className="
                font-bold
                text-amber-800
              "
            >
              {method.price === 0
                ? "رایگان"
                : method.price.toLocaleString("fa-IR") + " تومان"}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default DeliveryMethod;

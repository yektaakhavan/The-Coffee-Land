import { FaCreditCard, FaMoneyBillWave, FaUniversity } from "react-icons/fa";

function PaymentMethod({ selected, setSelected }) {
  const methods = [
    {
      id: "online",
      title: "پرداخت آنلاین",
      description: "پرداخت از طریق درگاه بانکی",
      icon: <FaCreditCard />,
    },
    {
      id: "cash",
      title: "پرداخت در محل",
      description: "ویژه شهرهای منتخب",
      icon: <FaMoneyBillWave />,
    },
    {
      id: "card",
      title: "کارت به کارت",
      description: "ارسال رسید پرداخت",
      icon: <FaUniversity />,
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">روش پرداخت</h2>

      <div className="space-y-4">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`
              flex justify-between items-center
              border-2 rounded-2xl
              p-5 cursor-pointer transition

              ${
                selected === method.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }
            `}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                checked={selected === method.id}
                onChange={() => setSelected(method.id)}
              />

              <div className="text-2xl text-green-700">{method.icon}</div>

              <div>
                <h3 className="font-bold">{method.title}</h3>

                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethod;

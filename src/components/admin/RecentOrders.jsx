import orders from "../../data/orders";
import formatPrice from "../../utils/formatPrice.js";

function RecentOrders() {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">آخرین سفارش‌ها</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right py-4">شماره</th>
              <th className="text-right">مشتری</th>
              <th className="text-right">مبلغ</th>
              <th className="text-right">وضعیت</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-stone-50">
                <td className="py-4">#{order.id}</td>

                <td>{order.customerName}</td>

                <td>{formatPrice(order.total)}</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;

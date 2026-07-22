
function AdminTable({
  columns,
  data,
  renderCell,
  emptyMessage = "اطلاعاتی وجود ندارد.",
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-right py-5 px-6 font-bold whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}

              
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length }
                  className="text-center py-14 text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    hover:bg-amber-50
                    transition
                  "
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-5 whitespace-nowrap"
                    >
                      {renderCell
                        ? renderCell(column.key, item)
                        : item[column.key]}
                    </td>
                  ))}

              
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTable;

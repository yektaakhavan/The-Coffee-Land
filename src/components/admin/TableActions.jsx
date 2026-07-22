import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function TableActions({ viewLink, editLink, onDelete }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        to={viewLink}
        className="
          w-9 h-9
          rounded-xl
          bg-blue-100
          hover:bg-blue-200
          text-blue-700
          flex items-center justify-center
          transition
        "
        title="مشاهده"
      >
        <FaEye />
      </Link>

      <Link
        to={editLink}
        className="
          w-9 h-9
          rounded-xl
          bg-amber-100
          hover:bg-amber-200
          text-amber-700
          flex items-center justify-center
          transition
        "
        title="ویرایش"
      >
        <FaEdit />
      </Link>

      <button
        onClick={onDelete}
        className="
          w-9 h-9
          rounded-xl
          bg-red-100
          hover:bg-red-200
          text-red-600
          flex items-center justify-center
          transition
        "
        title="حذف"
      >
        <FaTrash />
      </button>
    </div>
  );
}

export default TableActions;

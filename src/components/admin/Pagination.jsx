function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-3 mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`
              w-10
              h-10
              rounded-xl
              transition

              ${
                currentPage === index + 1
                  ? "bg-amber-700 text-white"
                  : "bg-white border"
              }
            `}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;

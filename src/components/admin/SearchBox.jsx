import { FiSearch } from "react-icons/fi";

function SearchBox({ value, onChange, placeholder = "جستجو..." }) {
  return (
    <div className="relative w-full md:w-80">
      <FiSearch className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-gray-200
          py-3
          pr-11
          pl-4
          outline-none
          focus:ring-2
          focus:ring-amber-400
        "
      />
    </div>
  );
}

export default SearchBox;

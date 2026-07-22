function TableHeader({ title, children }) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 items-center mb-8">
      <h1 className="text-3xl font-black">{title}</h1>

      {children}
    </div>
  );
}

export default TableHeader;

function FormGrid({ children, cols = 2 }) {
  const columns = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return <div className={`grid gap-6 ${columns[cols]}`}>{children}</div>;
}

export default FormGrid;

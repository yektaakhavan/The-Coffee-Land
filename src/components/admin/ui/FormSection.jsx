function FormSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-stone-200 p-6 bg-white">
      <h2 className="text-xl font-bold mb-6 pb-3 border-b border-stone-200">
        {title}
      </h2>

      {children}
    </section>
  );
}

export default FormSection;

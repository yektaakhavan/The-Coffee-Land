function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE2]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin" />
        <p className="text-amber-800 font-semibold text-sm">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

export default PageLoader;

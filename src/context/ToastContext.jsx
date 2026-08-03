import { createContext, useCallback, useContext, useState } from "react";
import { HiCheckCircle, HiXCircle, HiInformationCircle } from "react-icons/hi2";

const ToastContext = createContext();

const ICONS = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
};

const STYLES = {
  success: "bg-amber-900 text-amber-50 border-amber-700",
  error: "bg-red-900 text-red-50 border-red-700",
  info: "bg-stone-900 text-stone-50 border-stone-700",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast stack */}
      <div
        className="
          fixed bottom-5 inset-x-0 z-[100]
          flex flex-col items-center gap-3
          px-4 pointer-events-none
        "
      >
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] ?? ICONS.success;

          return (
            <div
              key={toast.id}
              className={`
                flex items-center gap-3
                w-full max-w-sm
                border rounded-2xl shadow-xl
                px-5 py-3.5
                animate-[reveal-up_.35s_ease-out_both]
                ${STYLES[toast.type] ?? STYLES.success}
              `}
            >
              <Icon className="text-xl shrink-0" />
              <p className="text-sm font-semibold leading-6">
                {toast.message}
              </p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used inside a ToastProvider");
  }

  return ctx;
}

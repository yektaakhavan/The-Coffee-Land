function ConfirmModal({
  isOpen,
  title = "تأیید عملیات",
  message = "آیا مطمئن هستید؟",
  confirmText = "تأیید",
  cancelText = "انصراف",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
        "
      >
        <h2 className="text-2xl font-bold text-stone-800">{title}</h2>

        <p className="mt-4 text-gray-600 leading-8">{message}</p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-xl
              border
              px-6
              py-3
              hover:bg-gray-100
              transition
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              rounded-xl
              bg-red-600
              px-6
              py-3
              text-white
              hover:bg-red-700
              transition
            "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

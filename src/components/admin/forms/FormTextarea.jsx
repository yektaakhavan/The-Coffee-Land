import { useFormContext } from "react-hook-form";

function FormTextarea({ name, label, placeholder = "", rows = 5, rules = {} }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-stone-700"
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name, rules)}
        aria-invalid={!!errors[name]}
        className={`
          w-full
          rounded-xl
          border
          border-stone-300
          px-4
          py-3
          outline-none
          resize-none
          transition
          focus:border-amber-600
          focus:ring-2
          focus:ring-amber-200
          ${errors[name] ? "border-red-500" : ""}
        `}
      />

      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
}

export default FormTextarea;

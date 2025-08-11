import { AlertCircle } from "lucide-react";

const TextareaField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 6,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#2A2A2A]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2.5 border rounded-lg text-base transition-colors duration-200 resize-y disabled:bg-[#FEFAF9] disabled:text-[#6B6A6A] ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-[#FEFAF9] focus:border-[#EB611F] focus:ring-[#EB611F]"
        } focus:outline-none focus:ring-2 focus:ring-opacity-20 text-[#2A2A2A] bg-[#FEFAF9]`}
        style={{ minHeight: "150px" }}
        {...props}
      />
      {error && (
        <div className="flex items-center space-x-1 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-[#6B6A6A]">{helperText}</p>
      )}
    </div>
  );
};

export default TextareaField;

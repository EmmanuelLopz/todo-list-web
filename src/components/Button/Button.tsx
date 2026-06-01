interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const base =
    "px-4 py-2.5 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-violet-700 text-white hover:bg-violet-800 active:bg-violet-900",
    secondary:
      "bg-white text-violet-700 border border-violet-300 hover:bg-violet-50 active:bg-violet-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {label}
    </button>
  );
}

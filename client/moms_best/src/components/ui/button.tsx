import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "text";
};

const differentVariants = new Map<string, string>([
  ["primary", "font-medium bg-primary-300 text-white hover:bg-primary-200"],
  ["text", "bg-transparent text-primary-300 hover:bg-primary-900/30"],
]);

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  variant,
  ...props
}) => {
  const variantValue =
    differentVariants.get(variant || "primary") ||
    differentVariants.get("primary");

  if (variantValue) {
    className += ` ${variantValue}`;
  }

  return (
    <button
      className={`px-4 py-2 rounded-full cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

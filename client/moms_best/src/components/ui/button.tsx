import { ButtonHTMLAttributes, FC } from "react";
import { getVariantClass, VariantType } from "../../types/button";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: VariantType;
};

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  variant,
  ...props
}) => {
  className += getVariantClass(variant || "primary");

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

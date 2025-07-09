import { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input: FC<InputProps> = ({ children, className = "", ...props }) => {
  return (
    <input
      className={`input input-bordered w-full ${className}`}
      {...props}
    />
  );
};

export default Input;

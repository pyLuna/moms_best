import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import { getVariantClass, VariantType } from "../../types/variants";
export default function AppLink({
  children,
  href,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: VariantType;
  className?: string;
}) {
  className = twMerge(
    className,
    getVariantClass(variant || "primary"),
    "px-4 py-2"
  );

  return (
    <Link
      to={href}
      className={className}
    >
      {children}
    </Link>
  );
}

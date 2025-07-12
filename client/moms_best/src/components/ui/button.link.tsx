import { Link } from "react-router";
import { getVariantClass, VariantType } from "../../types/button";
export default function ButtonLink({
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
  className += getVariantClass(variant);

  return (
    <Link
      to={href}
      className={`${className} px-4 py-2 rounded-full cursor-pointer`}
    >
      {children}
    </Link>
  );
}

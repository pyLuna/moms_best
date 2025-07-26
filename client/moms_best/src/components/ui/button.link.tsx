import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Link } from "react-router";
import { buttonVariants } from "./button";
export default function AppLink({
  children,
  href,
  onClick,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
}) {
  className = cn(className, buttonVariants({ variant }), "px-4 py-2");

  return (
    <Link
      onClick={onClick}
      to={href}
      className={className}
    >
      {children}
    </Link>
  );
}

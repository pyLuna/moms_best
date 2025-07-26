import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";

const MobileMenu = () => {
  const className = cn(buttonVariants({ variant: "ghost" }), "md:hidden");

  return (
    <>
      <span className={className}>
        <MenuIcon />
      </span>
    </>
  );
};

export default MobileMenu;

import { useMobileNav } from "@/contexts/MobileNavProvider";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import MobileSideNav from "./MobileSideNav";

const MobileMenu = () => {
  const { toggle } = useMobileNav();
  return (
    <>
      <Button
        variant="ghost"
        onClick={() => toggle()}
      >
        <MenuIcon />
      </Button>
      <MobileSideNav />
    </>
  );
};

export default MobileMenu;

import { useMobileNav } from "@/contexts/MobileNavProvider";
import { Url } from "@/url/Url";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

type MobileSideNavProps = {
  onSignIn?: () => void;
};

const MobileSideNav = ({ onSignIn }: MobileSideNavProps) => {
  const { isOpen, toggle, navigateRef } = useMobileNav();

  const navigate = useNavigate();

  const handleNavigate = (url?: string) => {
    const shouldNavigate = navigateRef?.current?.();
    console.log("MobileSideNav: handleNavigate", url, shouldNavigate);
    toggle(false); // Close the side nav after navigation
    if (!shouldNavigate) return;
    // Perform navigation
    if (url) {
      navigate(url);
    }
  };

  const handleSignIn = () => {
    toggle(false); // Close the side nav
    onSignIn?.();
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={toggle}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 text-center mx-6">
          <Button
            onClick={() => handleNavigate(Url.home)}
            variant="ghost"
          >
            Home
          </Button>
          <Button
            onClick={handleSignIn}
            variant="default"
          >
            Sign In
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideNav;

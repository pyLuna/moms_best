import { useMobileNav } from "@/contexts/MobileNavProvider";
import { Url } from "@/url/Url";
import AppLink from "../ui/button.link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const MobileSideNav = () => {
  const { isOpen, toggle } = useMobileNav();

  const onNavigate = () => {
    // Handle navigation logic here
    console.log("Navigation clicked");
    toggle(); // Close the menu after clicking
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={toggle}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          {/* <SheetDescription>Navigate through the app</SheetDescription> */}
        </SheetHeader>
        <nav className="flex flex-col gap-2 text-center">
          <AppLink
            onClick={onNavigate}
            href={Url.home}
            variant="ghost"
          >
            Home
          </AppLink>
          <AppLink
            onClick={onNavigate}
            href={Url.login}
            // onClick={handleLogin}
            variant="ghost"
          >
            Login
          </AppLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideNav;

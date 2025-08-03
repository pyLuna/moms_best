import { useMobileNav } from "@/contexts/MobileNavProvider";
import { useUser } from "@/contexts/UserContext";
import { Url } from "@/url/Url";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";
import DefaultHeader from "../header/DefaultHeader";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

type MobileSideNavProps = {
  onSignIn?: () => void;
  onSignUp?: () => void;
};

const MobileSideNav = ({ onSignIn, onSignUp }: MobileSideNavProps) => {
  const { isOpen, toggle, navigateRef } = useMobileNav();
  const { isLoggedIn, logout } = useUser();

  const navigate = useNavigate();

  const handleNavigate = (url?: string) => {
    const shouldNavigate = navigateRef?.current?.();
    toggle(false); // Close the side nav before navigation
    if (!shouldNavigate) return;
    if (url) {
      navigate(url);
    }
  };

  const handleSignIn = () => {
    toggle(false); // Close the side nav
    onSignIn?.();
  };

  const handleSignUp = () => {
    toggle(false); // Close the side nav
    onSignUp?.();
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={toggle}
    >
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 text-center m-6 h-full">
          <nav className="flex flex-col gap-2 text-center grow">
            <DefaultHeader
              setLoginOpen={handleSignIn}
              setSignUpOpen={handleSignUp}
              onNavigate={() => toggle(false)}
            />
          </nav>
          {isLoggedIn && (
            <Button
              onClick={() => {
                logout();
                handleNavigate(Url.home);
              }}
              variant="ghost"
              className="mt-4 w-full"
            >
              <LogOutIcon className="mr-2" />
              Log out
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideNav;

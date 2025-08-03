import { useMobileNav } from "@/contexts/MobileNavProvider";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import IconName from "../icon/IconName";
import MobileSideNav from "../nav/MobileSideNav";
import { ModeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import DefaultHeader from "./DefaultHeader";

const Header = () => {
  const { toggle } = useMobileNav();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between h-fit bg-background p-2 md:p-4">
        <IconName
          initial={false}
          className="text-primary-200"
        />
        <nav className="gap-4 hidden md:flex items-center justify-center mx-8 grow ">
          <DefaultHeader
            setLoginOpen={setLoginOpen}
            setSignUpOpen={setSignUpOpen}
          />
        </nav>
        <div className="flex flex-row items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            className="block md:hidden"
            onClick={() => toggle(true)}
          >
            <MenuIcon />
          </Button>
        </div>
      </header>
      <Login
        open={loginOpen}
        setOpen={setLoginOpen}
      />
      <SignUp
        open={signUpOpen}
        setOpen={setSignUpOpen}
      />
      <MobileSideNav
        onSignIn={() => setLoginOpen(true)}
        onSignUp={() => setSignUpOpen(true)}
      />
    </>
  );
};
export default Header;

import { useMobileNav } from "@/contexts/MobileNavProvider";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Url } from "../url/Url";
import Login from "./auth/Login";
import IconName from "./icon/IconName";
import MobileSideNav from "./nav/MobileSideNav";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import AppLink from "./ui/button.link";

const Header = () => {
  const { toggle } = useMobileNav();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mx-2 md:mx-6 ">
        <IconName
          initial={false}
          className="text-primary-200 grow"
        />
        <nav className="flex items-center justify-between gap-2 md:gap-4">
          {/* Hide nav on mobile */}
          <ModeToggle />
          <nav className="gap-4 hidden md:block items-center justify-end">
            <Link to={Url.home}>Home</Link>
            <Link to="">Test</Link>
            <Link to="">Test</Link>
            <Button
              variant="link"
              onClick={() => setLoginOpen(true)}
            >
              Sign In
            </Button>
            <AppLink href={Url.test}>Create Account</AppLink>
          </nav>
          <Button
            className="md:hidden"
            variant="ghost"
            onClick={() => toggle()}
          >
            <MenuIcon />
          </Button>
          <MobileSideNav onSignIn={() => setLoginOpen(true)} />
        </nav>
      </div>
      <Login
        open={loginOpen}
        setOpen={setLoginOpen}
      />
    </>
  );
};

export default Header;

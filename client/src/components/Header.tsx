import { useMobileNav } from "@/contexts/MobileNavProvider";
import { useUser } from "@/contexts/UserContext";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Url } from "../url/Url";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import IconName from "./icon/IconName";
import LoggedInHeader from "./LoggedInHeader";
import MobileSideNav from "./nav/MobileSideNav";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const Header = () => {
  const { toggle } = useMobileNav();
  const { isLoggedIn } = useUser();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mx-2 md:mx-6 ">
        <IconName
          initial={false}
          className="text-primary-200"
        />
        <nav className="gap-4 hidden md:flex items-center justify-center mx-8 grow ">
          {isLoggedIn ? (
            <LoggedInHeader />
          ) : (
            <DefaultHeader
              setLoginOpen={setLoginOpen}
              setSignUpOpen={setSignUpOpen}
            />
          )}
        </nav>
        <div className="flex flex-row items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            className="block md:hidden"
            onClick={() => toggle()}
          >
            <MenuIcon />
          </Button>
        </div>
      </div>
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

const DefaultHeader = ({
  setLoginOpen,
  setSignUpOpen,
}: {
  setLoginOpen: (open: boolean) => void;
  setSignUpOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <Link to={Url.home}>Home</Link>
      <Link to="">Test</Link>
      <Link to="">Test</Link>
      <Button
        variant="link"
        onClick={() => setLoginOpen(true)}
      >
        Sign In
      </Button>
      <Button onClick={() => setSignUpOpen(true)}>Create Account</Button>
    </>
  );
};

export default Header;

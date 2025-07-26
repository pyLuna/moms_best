import { Link } from "react-router";
import { Url } from "../url/Url";
import IconName from "./icon/IconName";
import MobileMenu from "./nav/MobileMenu";
import { ModeToggle } from "./ThemeToggle";
import AppLink from "./ui/button.link";

const Header = () => {
  return (
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
          <AppLink
            variant="text"
            href={Url.login}
          >
            Sign In
          </AppLink>
          <AppLink href={Url.signUp}>Create Account</AppLink>
        </nav>
        <MobileMenu />
      </nav>
    </div>
  );
};

export default Header;

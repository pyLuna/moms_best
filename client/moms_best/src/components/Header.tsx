import { Link } from "react-router";
import { Url } from "../url/Url";
import IconName from "./icon/IconName";
import AppLink from "./ui/button.link";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <IconName
          initial={false}
          className="text-primary-200"
        />
        <nav className="flex gap-4 items-center">
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
      </div>
    </>
  );
};

export default Header;

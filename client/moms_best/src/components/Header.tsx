import { Link } from "react-router";
import { Url } from "../url/Url";
import IconName from "./icon/IconName";
import ButtonLink from "./ui/button.link";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-2">
      <IconName
        initial={false}
        className="text-primary-200"
      />
      <nav className="flex gap-4 items-center">
        <Link to={Url.home}>Home</Link>
        <Link to="">Test</Link>
        <Link to="">Test</Link>
        <ButtonLink
          variant="text"
          href={Url.login}
        >
          Sign In
        </ButtonLink>
        <ButtonLink href={Url.signUp}>Create Account</ButtonLink>
      </nav>
    </div>
  );
};

export default Header;

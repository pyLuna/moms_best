import { useUser } from "@/contexts/UserContext";
import { Url } from "@/url/Url";
import { Button } from "./ui/button";
import AppLink from "./ui/button.link";

const LoggedInHeader = () => {
  const { logout } = useUser();
  const variant = "ghost";

  return (
    <nav className="hidden md:flex items-center gap-4">
      <AppLink
        variant={variant}
        href={Url.home}
      >
        Home
      </AppLink>
      <Button
        variant={variant}
        onClick={logout}
      >
        Logout
      </Button>
    </nav>
  );
};

export default LoggedInHeader;

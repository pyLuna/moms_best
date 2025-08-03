import { useUser } from "@/contexts/UserContext";
import { Url } from "@/url/Url";
import { Button } from "../ui/button";
import AppLink from "../ui/button.link";

export default function DefaultHeader({
  setLoginOpen,
  setSignUpOpen,
  onNavigate,
}: {
  setLoginOpen: (open: boolean) => void;
  setSignUpOpen: (open: boolean) => void;
  onNavigate?: () => void;
}) {
  const user = useUser();
  const variant = "ghost";

  const handleLinkClick = () => {
    onNavigate?.();
  };

  return (
    <>
      <AppLink
        href={Url.home}
        variant={variant}
        onClick={handleLinkClick}
      >
        Home
      </AppLink>
      <AppLink
        href={Url.category}
        variant={variant}
        onClick={handleLinkClick}
      >
        Category
      </AppLink>
      <AppLink
        href={Url.forum.go}
        variant={variant}
        onClick={handleLinkClick}
      >
        Forum
      </AppLink>
      {!user.isLoggedIn && (
        <>
          <Button
            className="block md:hidden"
            variant="link"
            onClick={() => setLoginOpen(true)}
          >
            Sign In
          </Button>
          <Button
            className="block md:hidden"
            onClick={() => setSignUpOpen(true)}
          >
            Create Account
          </Button>
        </>
      )}
    </>
  );
}

import { useUser } from "@/contexts/UserContext";
import { Url } from "@/url/Url";
import AppLink from "../ui/button.link";

const MobileLoggedIn = ({
  handleNavigate,
}: {
  handleNavigate?: (url?: string) => void;
}) => {
  const { isAdmin } = useUser();
  const variant = "ghost";
  return (
    <>
      {isAdmin && (
        <AppLink
          href={Url.category}
          variant={variant}
          onClick={() => handleNavigate?.(Url.category)}
        >
          Category
        </AppLink>
      )}
      {/* <Link to={Url.profile}>Profile</Link> */}
    </>
  );
};

export default MobileLoggedIn;

import { useUser } from "@/contexts/UserContext";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { Url } from "@/url/Url";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const LoggedInHeader = () => {
  const logout = useFetcher(ApiUrl.user.logout);
  const { logout: userLogout } = useUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await logout.get();
    if (result?.ok) {
      navigate(Url.home);
      userLogout();
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-4">
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default LoggedInHeader;

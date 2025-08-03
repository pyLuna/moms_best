import { useUser } from "@/contexts/UserContext";
import { Button } from "./ui/button";

const LoggedInHeader = () => {
  const { logout } = useUser();

  return (
    <nav className="hidden md:flex items-center gap-4">
      <Button onClick={logout}>Logout</Button>
    </nav>
  );
};

export default LoggedInHeader;

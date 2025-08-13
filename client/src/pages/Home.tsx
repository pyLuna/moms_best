import { Button } from "@/components/ui/button";
import AppLink from "@/components/ui/button.link";
import { useUser } from "@/contexts/UserContext";
import { Url } from "@/url/Url";
import { toast } from "sonner";

const Home = () => {
  const { user, isLoggedIn, logout } = useUser();

  const displayToast = () => {
    toast.success("Welcome to the Home Page!");
  };

  const displayErrorToast = () => {
    toast.error("Sample error message.");
  };

  const displayInfoToast = () => {
    toast.info("Sample info message.");
  };

  const displayWarningToast = () => {
    toast.warning("Sample warning message.");
  };

  return (
    <div className="page">
      <h1>Home</h1>
      <div className="flex flex-wrap gap-4">
        {isLoggedIn && user?.metadata?.role === "admin" && (
          <AppLink href={Url.category}>Category</AppLink>
        )}
        <Button onClick={displayToast}>Show Toast</Button>
        <Button onClick={displayErrorToast}>Show Error Toast</Button>
        <Button onClick={displayInfoToast}>Show Info Toast</Button>
        <Button onClick={displayWarningToast}>Show Warning Toast</Button>
        {isLoggedIn && (
          <Button onClick={logout} variant="secondary">Logout</Button>
        )}
      </div>
    </div>
  );
};

export default Home;

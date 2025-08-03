import AppLink from "@/components/ui/button.link";
import { useUser } from "@/contexts/UserContext";
import { Url } from "@/url/Url";

const Home = () => {
  const { user, isLoggedIn } = useUser();
  return (
    <div className="page">
      <h1>Home</h1>
      {isLoggedIn && user?.metadata?.role === "admin" && (
        <AppLink href={Url.category}>Go to Category</AppLink>
      )}
    </div>
  );
};

export default Home;
